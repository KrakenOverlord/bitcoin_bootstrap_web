import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Authentication from './authentication.js';
import './app.css';

function Header(props) {
  console.log("---Header");
  console.log(props.color);
  return (
    <Navbar style={{backgroundColor: props.color}} variant="dark">
      <Navbar.Brand href="#home">
       <img src="/bitcoin-bootstrap-logo.png"
        alt=""
        width="69"
        height="40"
        onClick={props.home}
        className="d-inline-block align-top"/>
      </Navbar.Brand>
      <Nav activeKey="#home" className="mr-auto">
        <Nav.Link onClick={() => props.showPage('landingPage')} href="#home">Home</Nav.Link>
        {props.contributor &&
          <>
          <Nav.Link onClick={() => props.showPage('registrationPage')} href="#registration">Registration</Nav.Link>
          <Nav.Link onClick={() => props.showPage('votingPage')} href="#voting">Voting</Nav.Link>
          </>
        }
        <Nav.Link onClick={() => props.showPage('learnMorePage')} href="#learn-more">Learn more</Nav.Link>
        <NavDropdown title="Contact" id="basic-nav-dropdown">
        <NavDropdown.Item href="#bug-report" onClick={() => props.showPage('bugReportPage')}>Bug Report</NavDropdown.Item>
        <NavDropdown.Item href="#feature-request" onClick={() => props.showPage('featureRequestPage')}>Feature Request</NavDropdown.Item>
      </NavDropdown>
      </Nav>
      <Form inline>
        <Authentication contributor={props.contributor} />
      </Form>
    </Navbar>
  );
}

export default Header;
