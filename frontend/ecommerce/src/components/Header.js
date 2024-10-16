import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

function Header() {
  const userLogin = useSelector(state => state.userLogin);

  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');  // Redirect to home page after logout
  }

  const sellHandler = () => {
    navigate('/create');
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>E-Commerce Cart</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home 
                {/* <i className="fa-solid fa-house"></i>  home icon */}
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Your Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name || "User"} id="user-nav-dropdown">
                <NavDropdown.Item onClick={sellHandler}>Sell</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" id="account-nav-dropdown">
                <LinkContainer to="/login">
                  <NavDropdown.Item>Login</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <NavDropdown.Item>Sign up</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;