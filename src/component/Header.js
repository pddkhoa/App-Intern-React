import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function Header() {
  const { user, logOut } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/login");
    toast.success("Logout success");
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">Demo App</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/users" className="nav-link">
            Manager User
          </NavLink>
        </Nav>
        <Nav className="ms-auto">
          {user && user.auth === true && (
            <div className="nav-link">Welcome {user.email}</div>
          )}
          {user && user.auth === true ? (
            <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
          ) : (
            <Nav.Link href="/login">Log in</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
