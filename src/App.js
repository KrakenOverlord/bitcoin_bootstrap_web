import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import AuthenticationController from './authentication_controller.js';
import MainScreen from './main_screen.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      contributors: []
    };

    this.signout = this.signout.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    window.history.pushState({}, null, 'home');

    if (this.state.user === null && code !== null) {
      console.log("Signing in with code = " + code);

      axios.post(this.api_url + "/signin?code=" + code)
        .then((response) => {
          var user = response.data;
          console.log("Signed in username: " + user.username);
          console.log("Signed in session_id: " + user.session_id);
          console.log("Signed in avatar_url: " + user.avatar_url);

          this.setState({
            user: user
          });

          if (user === null) {
            alert("You need to be a contributor to vote.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    else {
      axios.post(this.api_url + "/get_contributors")
        .then((response) => {
          this.setState({
            contributors: response.data
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  signout() {
    console.log("Signing out session_id " + this.state.user.session_id);

    axios.post(this.api_url + "/signout?session_id=" + this.state.user.session_id)
      .then((response) => {
        this.setState({
          user: null
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Navbar bg="light" expand="md">
          <Navbar.Brand href="#home">
           <img
             alt=""
             src="/bitcoin.png"
             width="30"
             height="30"
             className="d-inline-block align-top"
           />{' '}
           Bootstrap
         </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
          <AuthenticationController user={this.state.user} signout={this.signout} />
          </Navbar.Collapse>
        </Navbar>
        <MainScreen contributors={this.state.contributors} />
      </Container>
    );
  }
}

export default App;
