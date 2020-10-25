import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function AuthenticationController(props) {
  if (props.user === null) {
    return (
      <Nav.Link href="https://github.com/login/oauth/authorize?client_id=249829dba927c98cb3c8&allow_signup=false">Signin</Nav.Link>
    );
  } else {
    return (
      <>
        <Navbar.Text>Signed in as: {props.user.username}</Navbar.Text>
        <Nav.Link onClick={props.signout} href="">Signout</Nav.Link>
      </>
    );
  }
}

export default AuthenticationController;
