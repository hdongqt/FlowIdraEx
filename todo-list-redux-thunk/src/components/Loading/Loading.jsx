import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { reducer } from "./../../containers/Todo/todoSlice";

const ModalLoading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgb(1 0 0 / 8%);
  z-index: 12;
`;

const ModalLoadingContainer = styled.div`
  position: absolute;
  z-index: 113;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: #fff;
  width: 200px;
  min-height: 120px;
  padding: 20px;
  border-radius: 20px;
  .loader-text {
    display: block;
    color: #000;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: #2081ff;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  const loading = useSelector((state) => state.todos.loading);
  if (!loading) return null;
  return (
    <ModalLoading>
      <ModalLoadingContainer>
        <div>
          <div className="loader-text">Please wait...</div>
          <div className="loader"></div>
        </div>
      </ModalLoadingContainer>
    </ModalLoading>
  );
};

export default Loading;
