import styled from 'styled-components';

const AppCountDown = styled.div`
  text-align: center;
`;

const TitleHeading = styled.h2`
  font-size: 20px;
  color: #333;
  &:hover {
    color: red;
  }
`;

const Number = styled.span`
  font-size: 30px;
  padding-top: 20px;
`;
export { TitleHeading, Number, AppCountDown };
