import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Authentication from './authentication.js';
import './app.css';

function print(message) {
  if (process.env.REACT_APP_DEVELOPMENT) {
    console.log(message);
  }
}

function Header(props) {
  let eventKey = props.activePage;
  if (eventKey === 'bugReportPage' || eventKey === 'featureRequestPage') {
    eventKey = 'contactPage';
  }

  print("---Header");
  return (
    <Navbar style={{backgroundColor: "#5e5e5e"}} variant="dark" expand="lg">
      <Navbar.Brand>
      <img
        style={{cursor: 'pointer' }}
        onClick={() => props.showPage('homePage')}
        src="/bb-logo-white.png"
        alt=""
        width="50"
        height="50"
        className="ml-4 d-inline-block align-top"/>
      </Navbar.Brand>
      <span onClick={() => props.showPage('homePage')} className="mr-5" style={{color:'white', fontSize: '20px', cursor: 'pointer'}}>Bitcoin Bootstrap</span>
      <Nav activeKey={eventKey} className="ml-3 mr-auto">
        <Nav.Link eventKey='homePage' onClick={() => props.showPage('homePage')} href="#home">Home</Nav.Link>
        {props.contributor && props.contributor.is_candidate &&
          <Nav.Link eventKey='registrationPage' onClick={() => props.showPage('registrationPage')} href="#registration">Registration</Nav.Link>
        }
        {props.contributor && !props.contributor.is_candidate &&
          <Nav.Link eventKey='registerPage' onClick={() => props.showPage('registerPage')} href="#registration">Registration</Nav.Link>
        }
        {props.contributor &&
          <Nav.Link eventKey='votingPage' onClick={() => props.showPage('votingPage')} href="#voting">Voting</Nav.Link>
        }
        <Nav.Link eventKey='learnMorePage' onClick={() => props.showPage('learnMorePage')} href="#learn-more">Learn more</Nav.Link>
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
