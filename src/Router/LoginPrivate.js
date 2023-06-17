import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginPrivate({ element }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.account);

  return user.auth ? navigate("/") : element;
}
export default LoginPrivate;
