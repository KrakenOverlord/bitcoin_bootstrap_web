import React from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import Header from './header.js';
import Introduction from './introduction.js';
import Registration from './registration.js';
import CandidatesList from './candidates_list.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      candidates: []
    };

    this.changedRegistration = this.changedRegistration.bind(this);
    this.signout = this.signout.bind(this);
    this.vote = this.vote.bind(this);
    this.setVotedFor = this.setVotedFor.bind(this);
    this.loadCandidates = this.loadCandidates.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  changedRegistration(user) {
    this.setState({ user: user }, () => { this.loadCandidates(); });
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
    if (this.state.user === null) {
      return (
        <Container>
          <Header user={this.state.user} signout={this.signout} />
          <Introduction />
          <CandidatesList user={this.state.user} candidates={this.state.candidates} vote={this.vote} />
        </Container>
      );
    } else {
      return (
        <Container>
          <Header user={this.state.user} signout={this.signout} />
          <Tabs>
            <Tab eventKey="vote" title="Vote">
              <CandidatesList user={this.state.user} candidates={this.state.candidates} vote={this.vote} />
            </Tab>
            <Tab eventKey="register" title="Register">
              <Registration user={this.state.user} changedRegistration={this.changedRegistration} />
            </Tab>
          </Tabs>
        </Container>
      );
    }
  }
}

export default App;
