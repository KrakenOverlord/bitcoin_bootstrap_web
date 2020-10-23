import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import AuthenticationController from './authentication_controller.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null
    };

    this.signout = this.signout.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  componentDidMount() {
    console.log("username = " + this.state.username);

    const parsedUrl = new URL(window.location.href);
    const code = parsedUrl.searchParams.get("code");

    if (this.state.username === null && code !== null) {
      console.log("Code = " + code);

      axios.post(this.api_url + "/authenticate?code=" + code)
        .then((response) => {
          var username = response.data.username;
          console.log("Username from backend call: " + username);

          this.setState({
            username: username
          });

          if (username === null) {
            alert("Could not sign you in.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
  }

  signout() {
    this.setState({
      username: null
    })
  }

  render() {
    return (
      <Container>
        <Navbar bg="light" expand="md">
          <Navbar.Brand href="#home">Bitcoin Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
          <AuthenticationController username={this.state.username} signout={this.signout} />
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default App;
