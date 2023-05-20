import React, { useContext } from "react";
import { UserContext } from "../component/UserContext";
import { useNavigate } from "react-router";

function LoginPrivate({ element }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return user.auth ? navigate("/") : element;
}
export default LoginPrivate;
