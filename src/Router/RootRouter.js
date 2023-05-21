import React from "react";
import PrivateRouter from "./PrivateRouter";
import AppRouter from "./AppRouter";
import LoginPrivate from "./LoginPrivate";
import Login from "../component/Login";
import { Routes, Route } from "react-router-dom";

function RootRouter() {
  return (
    <Routes>
      <Route path="/*" element={<PrivateRouter element={<AppRouter />} />} />
      <Route path="/login" element={<LoginPrivate element={<Login />} />} />
    </Routes>
  );
}
export default RootRouter;
