import { loginApp } from "../../Service/userService";
import { toast } from "react-toastify";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const USER_REFRESH = "USER_REFRESH";

export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_USER_LOGIN,
    });

    let res = await loginApp(email.trim(), password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", email);

      dispatch({
        type: FETCH_USER_SUCCESS,
        data: { email: email.trim(), token: res.token },
      });
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
      dispatch({
        type: FETCH_USER_ERROR,
      });
    }
  };
};
export const handleLogoutRedux = () => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
};
export const handleRefreshRedux = () => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_REFRESH,
    });
  };
};
