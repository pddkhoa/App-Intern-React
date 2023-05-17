import React from "react";
import Header from "./component/Header";
import { Container } from "react-bootstrap";
import TableUser from "./component/TableUser";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Container className="mt-5">
        <TableUser />
      </Container>
    </div>
  );
}

export default App;
