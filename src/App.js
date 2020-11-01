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
      candidates: []
    };

    this.signout = this.signout.bind(this);
    this.vote = this.vote.bind(this);
    this.setVotedFor = this.setVotedFor.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  loadCandidates() {
    axios.post(this.api_url + "/get_candidates")
      .then((response) => {
        let candidates = response.data;

        candidates.sort(function(a, b) { return b.votes - a.votes });

        this.setState({
          candidates: candidates
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setVotedFor(username) {
    var user = {...this.state.user};
    user.voted_for = username;
    this.setState({user});
  }

  changeCandidate(newCandidateUsername) {
    let candidates = [...this.state.candidates];

    // Decrement old candidate if the user previously voted
    if (this.state.user.voted_for !== '') {
      const index = this.state.candidates.findIndex(candidate => candidate.username === this.state.user.voted_for);
      const oldCandidate = this.state.candidates[index];
      oldCandidate.votes = oldCandidate.votes - 1;
      candidates[index] = oldCandidate;
    }

    // Increment new candidate
    const index = this.state.candidates.findIndex(candidate => candidate.username === newCandidateUsername);
    const newCandidate = this.state.candidates[index];
    newCandidate.votes = newCandidate.votes + 1;
    candidates[index] = newCandidate;

    candidates.sort(function(a, b) { return b.votes - a.votes });

    this.setState({candidates});

    this.setVotedFor(newCandidateUsername);
  }

  vote(new_candidate_username) {
    axios.post(this.api_url + "/vote?session_id=" + this.state.user.session_id +"&vote=" + new_candidate_username)
      .then((response) => {
        this.changeCandidate(new_candidate_username);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    window.history.pushState({}, null, 'home');

    if (this.state.user === null && code !== null) {
      axios.post(this.api_url + "/signin?code=" + code)
        .then((response) => {
          var user = response.data;
console.log(user);
          if (user === null) {
            alert("You need to be a contributor to vote.");
          } else {
            this.setState({
              user: user
            });
            this.loadCandidates();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    else {
      this.loadCandidates();
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
        <MainScreen user={this.state.user} contributors={this.state.candidates} vote={this.vote} />
      </Container>
    );
  }
}

export default App;
