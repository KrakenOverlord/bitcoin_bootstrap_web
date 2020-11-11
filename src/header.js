import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Authentication from './authentication.js';

function Header(props) {
  console.log("---Header");
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="#home">
       <img src="/Bitcoin-Logo.png" alt="" width="69" height="40" className="d-inline-block align-top"/>{' '}Bootstrap
     </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
      <Authentication contributor={props.contributor} />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
