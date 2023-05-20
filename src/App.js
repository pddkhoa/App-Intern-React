import React, { useContext, useEffect } from "react";
import Header from "./component/Header";

import { Container } from "react-bootstrap";
import AppRouter from "./Router/AppRouter";
import RootRouter from "./Router/RootRouter";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./component/UserContext";
import "./App.css";

function App() {
  const { user, loginContext } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
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
