import React, { Component } from 'react';
import { TitleHeading, AppCountDown, Number } from './Countdown.style';
export default class CountdownClass extends Component {
  state = {
    count: 10,
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.count > 0) {
        this.setState({
          count: this.state.count - 1,
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <AppCountDown>
        <TitleHeading>Count down Class Component</TitleHeading>
        <Number>{this.state.count}</Number>
      </AppCountDown>
    );
  }
}
