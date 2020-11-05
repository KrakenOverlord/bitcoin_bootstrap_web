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
      contributor: null,
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

  componentDidMount() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    window.history.pushState({}, null, 'home');

    const stringified_contributor = localStorage.getItem('contributor');
    const contributor = JSON.parse(stringified_contributor);
    console.log("localStorage contributor = " + JSON.stringify(contributor));
    this.setState({
      contributor: contributor
    })

    if (this.state.contributor === null && code !== null) {
      console.log("Calling signin");
      axios.post(this.api_url + "/signin?code=" + code)
        .then((response) => {
          var contributor = response.data;
          console.log(contributor);
          if (contributor === null) {
            alert("You need to be a contributor to sign in.");
          } else {
            localStorage.setItem('contributor', JSON.stringify(contributor));
            this.setState({
              contributor: contributor
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

  changedRegistration(contributor) {
    this.setState({ contributor: contributor }, () => { this.loadCandidates(); });
  }

  setVotedFor(username) {
    var contributor = {...this.state.contributor};
    contributor.voted_for = username;
    this.setState({contributor});
  }

  changeCandidate(newCandidateUsername) {
    let candidates = [...this.state.candidates];

    // Decrement old candidate if the contributor previously voted
    if (this.state.contributor.voted_for !== '') {
      const index = this.state.candidates.findIndex(candidate => candidate.username === this.state.contributor.voted_for);
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
    axios.post(this.api_url + "/vote?session_id=" + this.state.contributor.session_id +"&vote=" + new_candidate_username)
      .then((response) => {
        this.changeCandidate(new_candidate_username);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signout() {
    console.log("Signing out session_id " + this.state.contributor.session_id);

    axios.post(this.api_url + "/signout?session_id=" + this.state.contributor.session_id)
      .then((response) => {
        this.setState({
          contributor: null
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.contributor === null) {
      return (
        <Container>
          <Header contributor={this.state.contributor} signout={this.signout} />
          <Introduction />
          <CandidatesList contributor={this.state.contributor} candidates={this.state.candidates} vote={this.vote} />
        </Container>
      );
    } else {
      return (
        <Container>
          <Header contributor={this.state.contributor} signout={this.signout} />
          <Tabs>
            <Tab eventKey="vote" title="Vote">
              <CandidatesList contributor={this.state.contributor} candidates={this.state.candidates} vote={this.vote} />
            </Tab>
            <Tab eventKey="register" title="Register">
              <Registration contributor={this.state.contributor} changedRegistration={this.changedRegistration} />
            </Tab>
          </Tabs>
        </Container>
      );
    }
  }
}

export default App;
