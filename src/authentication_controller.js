import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AuthenticationController(props) {
  if (props.user === null) {
    return (
      <Nav.Link href="https://github.com/login/oauth/authorize?client_id=249829dba927c98cb3c8&allow_signup=false">
      Sign in with Github
      <img
        src="/github.png"
        alt=""
        height="25"
        width="45"
      />
      </Nav.Link>
    );
  } else {
    return (
      <>
        <NavDropdown title={
          <>
            <img src={props.user.avatar_url} alt="" height="25" width="25" />
            {props.user.username}
          </>
        }>
          <NavDropdown.Item onClick={props.signout}>Sign out</NavDropdown.Item>
        </NavDropdown>
      </>
    );
  }
}

export default AuthenticationController;
