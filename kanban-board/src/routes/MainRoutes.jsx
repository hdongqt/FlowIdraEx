import React from "react";
import { Routes, Route } from "react-router-dom";
import { BoardActive, BackLog } from "../features/Board";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<BoardActive />}></Route>
      <Route path="/backlog" element={<BackLog />}></Route>
    </Routes>
  );
};

export default MainRoutes;
