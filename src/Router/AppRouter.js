import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../component/Login";
import TableUser from "../component/TableUser";
import Home from "../component/Home";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<TableUser />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default AppRouter;
