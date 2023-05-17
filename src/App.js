import React, { useState } from "react";
import Header from "./component/Header";
import { Button, Container, Stack } from "react-bootstrap";
import TableUser from "./component/TableUser";
import AddNew from "./component/AddNew";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Container className="mt-3">
        <TableUser />
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
