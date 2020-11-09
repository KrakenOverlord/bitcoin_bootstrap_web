import React from 'react';
import Nav from 'react-bootstrap/Nav';

class Authentication extends React.Component {
  render() {
    console.log("---Authentication");

    if (this.props.contributor === null) {
      return (
        <Nav.Link href={"https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID + "&allow_signup=false"}>
        Sign in with Github
        <img src="/github.png" alt="" height="25" width="45" />
        </Nav.Link>
      )
    } else {
      return (
        <>
          <img className='mr-2' src={this.props.contributor.avatar_url} alt="" height="25" width="25" />
          {this.props.contributor.username}
        </>
      )
    }
  }
}

export default Authentication;
