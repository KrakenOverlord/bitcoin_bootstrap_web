import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Authentication from './authentication.js';

function Header(props) {
  console.log("---Header");

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">
       <img src="/bitcoin-bootstrap-logo.png"
        alt=""
        width="69"
        height="40"
        onClick={props.home}
        className="d-inline-block align-top"/>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={props.home} href="#home">Home</Nav.Link>
        <Nav.Link onClick={props.showLearnMorePage} href="#learn-more">Learn more</Nav.Link>
        <NavDropdown title="Contact" id="basic-nav-dropdown">
        <NavDropdown.Item href="#bug-report" onClick={props.showBugReportPage}>Bug Report</NavDropdown.Item>
        <NavDropdown.Item href="#feature-request" onClick={props.showFeatureRequestPage}>Feature Request</NavDropdown.Item>
      </NavDropdown>
      </Nav>
      <Form inline>
        <Authentication contributor={props.contributor} />
      </Form>
    </Navbar>
  );
}

export default Header;
