import React from 'react';
import Nav from 'react-bootstrap/Nav';

class Authentication extends React.Component {
  render() {
    console.log("---Authentication");

    if (this.props.contributor === null) {
      return (
        <Nav.Link style={{color:'white'}} href={"https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID + "&allow_signup=false"}>
        Sign in with GitHub
        <img className='ml-2' src="/GitHub-Mark-Light-32px.png" alt="" height="32" width="32" />
        </Nav.Link>
      )
    } else {
      return (
        <>
          <img className='mr-2' src={this.props.contributor.avatar_url} alt="" height="25" width="25" />
          <span style={{color:'white'}}>{this.props.contributor.username}</span>
        </>
      )
    }
  }
}

export default Authentication;
