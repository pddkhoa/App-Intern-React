import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
function PrivateRouter({ element }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.account);

  return user.auth ? element : navigate("/login");
}
export default PrivateRouter;
