import React, { useContext } from "react";
import { UserContext } from "../component/UserContext";
import { useNavigate } from "react-router";
function PrivateRouter({ element }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return user.auth ? element : navigate("/login");
}
export default PrivateRouter;
