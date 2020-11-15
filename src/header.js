import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Authentication from './authentication.js';

function Header(props) {
  console.log("---Header");

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="#home">
       <img src="/Bitcoin-Logo.png"
        alt=""
        width="69"
        height="40"
        onClick={props.home}
        className="d-inline-block align-top"/>
        {' '}<span onClick={props.home}>Bootstrap</span>
     </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav.Link onClick={props.showLearnMore} href="#learn-more">Learn more</Nav.Link>
      <Nav.Link href="#contact">Contact</Nav.Link>
      <Navbar.Collapse className="justify-content-end">

      <Authentication contributor={props.contributor} />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
