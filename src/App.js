import React from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import Header from './header.js';
import Introduction from './introduction.js';
import CandidatesList from './candidates_list.js';
import AlertMessage from './alert_message.js';
import ContributorPage from './contributor_page.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      state: '', // ['landingPage', 'signedIn']
      voting: false,
      contributor: null,
      candidates: []
    };

    this.updateState = this.updateState.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
    this.isVotingCallback = this.isVotingCallback.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  componentDidMount() {
    if (this.code() !== null) {
      this.authenticateWithCode(this.code());
    } else if (this.accessToken() !== null) {
      this.authenticateWithAccessToken(this.accessToken());
    } else {
      this.landingPage();
    }
  }

  accessToken() {
    return localStorage.getItem('access_token');
  }

  code() {
    const url = new URL(window.location.href);
    return url.searchParams.get("code");
  }

  landingPage() {
    console.log("Calling get_candidates");
    axios.post(this.api_url + "/get_candidates")
      .then((response) => {
        let candidates = response.data.candidates;
        candidates.sort(function(a, b) { return b.votes - a.votes });
        this.setState({
          state:      'landingPage',
          candidates: candidates
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  authenticateWithCode(code) {
    window.history.pushState({}, null, 'home');
    console.log("Calling signin_with_code");
    axios.post(this.api_url + "/signin_with_code?code=" + code)
      .then((res) => {
        var response = res.data;
        console.log("signin_with_code response: " + JSON.stringify(response));

        if (response.error === true) {
          if (response.error_code === 1) {
            alert("Only contributors to the Bitcoin GitHub repository are allowed to sign in.");
          } else {
            console.log("Problem signing in: " + response.error);
          }
        } else {
          localStorage.setItem('access_token', response.contributor.access_token);
          let candidates = response.candidates;
          candidates.sort(function(a, b) { return b.votes - a.votes });
          this.setState({
            state:        'signedIn',
            contributor:  response.contributor,
            candidates:   candidates
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  authenticateWithAccessToken(access_token) {
    console.log("Calling signin_with_access_token");
    axios.post(this.api_url + "/signin_with_access_token?access_token=" + access_token)
      .then((res) => {
        var response = res.data;
        console.log("signin_with_access_token response: " + JSON.stringify(response));
        if (response.error === true) {
          if (response.error_code === 0 || response.error_code === 1) {
            this.signOut();
          } else if (response.error_code === 100) {
            alert("Internal server error.");
          }
        } else {
          let candidates = response.candidates;
          candidates.sort(function(a, b) { return b.votes - a.votes });
          this.setState({
            state:        'signedIn',
            contributor:  response.contributor,
            candidates:   candidates
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signOut() {
    localStorage.removeItem('access_token');
    this.setState({
      state: '',
      contributor: null
    }, this.landingPage);
  }

  updateState(contributor, candidates, alert) {
    candidates.sort(function(a, b) { return b.votes - a.votes });

    this.setState({
      alert: alert,
      contributor: contributor,
      candidates: candidates
    });
  }

  isVotingCallback(state) {
    this.setState({ voting: state });
  }

  deleteAlert() {
    this.setState({ alert: null });
  }

  render() {
    console.log("---App");

    if (this.state.state === 'landingPage') {
      return (
        <Container>
          <Header contributor={this.state.contributor} />
          <Introduction />
          <CandidatesList
            contributor={this.state.contributor}
            candidates={this.state.candidates}
            updateState={this.updateState}
            voting={this.state.voting}
            isVotingCallback={this.isVotingCallback} />
        </Container>
      );
    } else if (this.state.state === 'signedIn') {
      return (
        <Container>
          <Header contributor={this.state.contributor} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <ContributorPage
            contributor={this.state.contributor}
            candidates={this.state.candidates}
            updateState={this.updateState}
            voting={this.state.voting}
            isVotingCallback={this.isVotingCallback} />
        </Container>
      );
    } else {
      const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

      return(
        <div className="text-center" style={style}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )
    }
  }
}

export default App;

// setVotedFor(username) {
//   var contributor = {...this.state.contributor};
//   contributor.voted_for = username;
//   this.setState({contributor});
// }
//
// changeCandidate(newCandidateUsername) {
//   let candidates = [...this.state.candidates];
//
//   // Decrement old candidate if the contributor previously voted
//   if (this.state.contributor.voted_for !== '') {
//     const index = this.state.candidates.findIndex(candidate => candidate.username === this.state.contributor.voted_for);
//     const oldCandidate = this.state.candidates[index];
//     oldCandidate.votes = oldCandidate.votes - 1;
//     candidates[index] = oldCandidate;
//   }
//
//   // Increment new candidate
//   const index = this.state.candidates.findIndex(candidate => candidate.username === newCandidateUsername);
//   const newCandidate = this.state.candidates[index];
//   newCandidate.votes = newCandidate.votes + 1;
//   candidates[index] = newCandidate;
//
//   candidates.sort(function(a, b) { return b.votes - a.votes });
//
//   this.setState({candidates});
//
//   this.setVotedFor(newCandidateUsername);
// }
