import React, { useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { handleLogoutRedux } from "../Redux/actions/userAction";
function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("check");
    dispatch(handleLogoutRedux());
  };

  useEffect(() => {
    if (user && user.auth === false) {
      navigate("/");
      toast.success("Logout success");
    }
  }, [user]);
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
