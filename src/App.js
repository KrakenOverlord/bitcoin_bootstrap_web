import React from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Header from './header.js';
import Introduction from './introduction.js';
import CandidatesList from './candidates_list.js';
import AlertMessage from './alert_message.js';
import ContributorPage from './contributor_page.js';
import LearnMore from './learn_more.js';
import BugReport from './bug_report.js';
import FeatureRequest from './feature_request.js';
import LoadingSpinner from './loading_spinner.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: null,
      alert: null,
      appState: 'loading', // ['loading', 'signedOut', 'signedIn', 'learnMore', 'bugReport', 'featureRequest']
      contributor: null,
      candidates: []
    };

    this.isUpdatingCallback = this.isUpdatingCallback.bind(this);
    this.updateState = this.updateState.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
    this.showLearnMorePage = this.showLearnMorePage.bind(this);
    this.showBugReportPage = this.showBugReportPage.bind(this);
    this.showFeatureRequestPage = this.showFeatureRequestPage.bind(this);

    this.home = this.home.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  componentDidMount() {
    if (this.getCode() !== null) {
      this.signInWithCode(this.getCode());
    } else if (this.getAccessToken() !== null) {
      this.signInWithAccessToken(this.getAccessToken());
    } else {
      this.getCandidates();
    }
  }

  getCode() {
    const url = new URL(window.location.href);
    return url.searchParams.get("code");
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  signInWithCode(code) {
    window.history.pushState({}, null, 'home');

    console.log("Calling signin_with_code");
    axios.post(this.api_url + "/signin_with_code", {
      code: code
    })
    .then((res) => {
      var response = res.data;
      console.log("signin_with_code response: " + JSON.stringify(response));

      if (response.error) {
        if (response.error_code === 1) {
          this.showAlert({ variant: 'info', message: "Only contributors to the Bitcoin GitHub repository are allowed to sign in." });
        } else {
          this.signOut();
        }
      } else {
        localStorage.setItem('access_token', response.contributor.access_token);
        let candidates = response.candidates;
        candidates.sort(function(a, b) { return b.votes - a.votes });
        this.setState({
          appState:     'signedIn',
          contributor:  response.contributor,
          candidates:   candidates
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  signInWithAccessToken(access_token) {
    console.log("Calling signin_with_access_token");
    axios.post(this.api_url + "/signin_with_access_token", {
      access_token: access_token
    })
    .then((res) => {
      var response = res.data;
      console.log("signin_with_access_token response: " + JSON.stringify(response));

      if (response.error) {
        if (response.error_code === 0 || response.error_code === 1) {
          this.signOut();
        }
      } else {
        let candidates = response.candidates;
        candidates.sort(function(a, b) { return b.votes - a.votes });
        this.setState({
          appState:     'signedIn',
          contributor:  response.contributor,
          candidates:   candidates
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getCandidates() {
    console.log("Calling get_candidates");
    axios.post(this.api_url + "/get_candidates")
      .then((res) => {
        var response = res.data;
        console.log("get_candidates response: " + JSON.stringify(response));

        if (response.error) {
          this.setState({
            appState: 'signedOut'
          });
        } else {
          let candidates = response.candidates;
          candidates.sort(function(a, b) { return b.votes - a.votes });
          this.setState({
            appState: 'signedOut',
            candidates: candidates
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          appState: 'signedOut'
        });
      });
  }

  // CALLBACKS

  isUpdatingCallback(isUpdating) {
    this.setState({
      isUpdating: isUpdating
    });
  }

  home() {
    let appState = '';
    if (this.state.contributor) {
      appState = 'signedIn';
    } else if (this.state.contributor === null) {
      appState = 'signedOut';
    }

    this.setState({ appState: appState });
  }

  showAlert(message) {
    this.setState({
      alert: message
    });
  }

  deleteAlert() {
    this.setState({ alert: null });
  }

  showBugReportPage() {
    this.setState({ appState: 'bugReport' });
  }

  showFeatureRequestPage() {
    this.setState({ appState: 'featureRequest' });
  }

  showLearnMorePage() {
    this.setState({ appState: 'learnMore' });
  }

  signOut() {
    localStorage.removeItem('access_token');
    this.setState({
      appState: 'loading',
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

  // END CALLBACKS

  render() {
    console.log("---App");

    if (this.state.appState === 'signedOut') {
      return (
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <Introduction numCandidates={this.state.candidates.length} showLearnMorePage={this.showLearnMorePage} />
          {this.state.candidates.length !== 0 &&
            <CandidatesList
              contributor={this.state.contributor}
              candidates={this.state.candidates} />
          }
        </Container>
      );
    } else if (this.state.appState === 'signedIn') {
      return (
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <ContributorPage
            contributor={this.state.contributor}
            candidates={this.state.candidates}
            updateState={this.updateState}
            signOut={this.signOut}
            showAlert={this.showAlert} />
        </Container>
      );
    } else if (this.state.appState === 'learnMore') {
      return(
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <LearnMore contributor={this.state.contributor} />
        </Container>
      );
    } else if (this.state.appState === 'bugReport') {
      return(
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <BugReport
            contributor={this.state.contributor}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        </Container>
      );
    } else if (this.state.appState === 'featureRequest') {
      return(
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <FeatureRequest
            contributor={this.state.contributor}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        </Container>
      );
    } else if (this.state.appState === 'loading') {
      return(
        <LoadingSpinner />
      );
    }
  }
}

export default App;
