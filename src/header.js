import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import AuthenticationController from './authentication_controller.js';

function Header(props) {
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="#home">
       <img
         alt=""
         src="/bitcoin.png"
         width="30"
         height="30"
         className="d-inline-block align-top"
       />{' '}
       Bootstrap
     </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
      <AuthenticationController user={props.user} signout={props.signout} />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
