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
    // If there is an access_token then automatically sign them in.
    const access_token = localStorage.getItem('access_token');
    if (access_token !== null) {
      console.log("Automatic sign in");
      axios.post(this.api_url + "/signin_with_access_token?access_token=" + access_token)
        .then((res) => {
          var response = res.data;
          console.log("signin_with_access_token response: " + JSON.stringify(response));
          if (response.error !== undefined) {
            localStorage.removeItem('access_token');
          } else {
            this.setState({
              contributor: response.contributor,
              candidates: response.candidates
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      window.history.pushState({}, null, 'home');

      // If they are signing in
      if (code !== null) {
        console.log("Manual sign in");
        axios.post(this.api_url + "/signin_with_code?code=" + code)
          .then((res) => {
            var response = res.data;
            console.log("signin_with_code response: " + JSON.stringify(response));

            if (response.error !== undefined) {
              if (response.error === 1) {
                alert("You need to be a contributor to sign in.");
              } else {
                console.log("Problem signing in: " + response.error);
              }
            } else {
              localStorage.setItem('access_token', response.contributor.access_token);
              this.setState({
                contributor: response.contributor,
                candidates: response.candidates
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
    }
  }

  loadCandidates() {
    console.log("Loading candidates.");
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
