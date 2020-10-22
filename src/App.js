import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  componentDidMount() {
    const parsedUrl = new URL(window.location.href);
    const code = parsedUrl.searchParams.get("code");

    if (code !== null) {
      console.log("Code = " + code);

      axios.post(this.api_url + "/authenticate?code=" + code)
        .then((response) => {
          console.log(response);
          // var users = response.data;
          // users.sort((a, b) => (a.email > b.email) ? 1 : -1)
          //
          // this.setState({
          //   isLoaded: true,
          //   users: users
          // });
        })
        .catch((error) => {
          console.log(error);
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        });
      }
  }

  render() {
    return (
      <a href="https://github.com/login/oauth/authorize?client_id=249829dba927c98cb3c8&allow_signup=false">Signin</a>
    );
  }
}

export default App;
