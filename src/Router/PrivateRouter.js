import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function PrivateRouter({ element }) {
  const user = useSelector((state) => state.user.account);

  return user.auth ? element : <Navigate to="/login" />;
}
export default PrivateRouter;
