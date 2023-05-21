import React, { useContext, useEffect } from "react";
import Header from "./component/Header";

import { Container } from "react-bootstrap";
import RootRouter from "./Router/RootRouter";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "./App.css";
import { useSelector } from "react-redux";
import {
  handleLoginRedux,
  handleRefreshRedux,
} from "./Redux/actions/userAction";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.account);
  console.log(user);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefreshRedux());
    }
  }, []);

  return (
    <div className="App">
      {user.auth === true && <Header />}
      <Container className="mt-3">
        <RootRouter />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
