import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class AuthenticationController extends React.Component {
  render() {
    console.log("---AuthenticationController");

    if (this.props.contributor === null) {
      return (
        <Nav.Link href={"https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID + "&allow_signup=false"}>
        Sign in with Github
        <img
          src="/github.png"
          alt=""
          height="25"
          width="45"
        />
        </Nav.Link>
      )
    } else {
      return (
        <>
          <NavDropdown title={
            <>
              <img src={this.props.contributor.avatar_url} alt="" height="25" width="25" />
              {this.props.contributor.username}
            </>
          }>
            <NavDropdown.Item onClick={this.props.signout}>Sign out</NavDropdown.Item>
          </NavDropdown>
        </>
      )
    }
  }
}

export default AuthenticationController;
