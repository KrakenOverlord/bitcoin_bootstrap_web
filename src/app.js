import React from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Header from './header.js';
import Introduction from './introduction.js';
import CandidatesList from './candidates_list.js';
import AlertMessage from './alert_message.js';
import RegistrationPage from './registration_page.js';
import Voting from './voting.js';
import LearnMorePage from './learn_more_page.js';
import BugReportPage from './bug_report_page.js';
import FeatureRequestPage from './feature_request_page.js';
import LoadingSpinner from './loading_spinner.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: null,
      alert: null,
      appState: 'landingPage', // ['loadingPage', 'landingPage', 'registrationPage', 'votingPage', 'learnMorePage', 'bugReportPage', 'featureRequestPage']
      contributor: null,
      candidates: []
    };

    this.isUpdatingCallback = this.isUpdatingCallback.bind(this);
    this.updateState = this.updateState.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
    this.showRegistrationPagePage = this.showRegistrationPagePage.bind(this);
    this.showVotingPage = this.showVotingPage.bind(this);
    this.showLearnMorePage = this.showLearnMorePage.bind(this);
    this.showBugReportPage = this.showBugReportPage.bind(this);
    this.showFeatureRequestPage = this.showFeatureRequestPage.bind(this);

    this.home = this.home.bind(this);

    this.api_url = process.env.REACT_APP_API_GATEWAY + "/api";
  }

  componentDidMount() {
    if (this.getCode() !== null) {
      this.signInWithCode(this.getCode());
    } else if (this.getAccessToken() !== null) {
      this.signInWithAccessToken(this.getAccessToken());
    }

    this.getCandidates();
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

    console.log("Calling SigninWithCode");
    axios.post(this.api_url, {
      command: 'SigninWithCode',
      code: code
    })
    .then((res) => {
      var response = res.data;
      console.log("SigninWithCode response: " + JSON.stringify(response));

      if (response.error) {
        if (response.error_code === 1) {
          this.showAlert({ variant: 'info', message: "Only contributors to the Bitcoin GitHub repository are allowed to sign in." });
        } else {
          this.signOut();
        }
      } else {
        localStorage.setItem('access_token', response.contributor.access_token);
        this.setState({
          contributor:  response.contributor
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  signInWithAccessToken(access_token) {
    console.log("Calling SigninWithAccessToken");
    axios.post(this.api_url, {
      command: 'SigninWithAccessToken',
      access_token: access_token
    })
    .then((res) => {
      var response = res.data;
      console.log("SigninWithAccessToken response: " + JSON.stringify(response));

      if (response.error) {
        if (response.error_code === 0 || response.error_code === 1) {
          this.signOut();
        }
      } else {
        this.setState({
          contributor:  response.contributor
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getCandidates() {
    console.log("Calling GetCandidates");
    axios.post(this.api_url, {
      command: 'GetCandidates'
    })
    .then((res) => {
      var response = res.data;
      console.log("get_candidates response: " + JSON.stringify(response));

      if (response.error) {
      } else {
        let candidates = response.candidates;
        candidates.sort(function(a, b) { return b.votes - a.votes });
        this.setState({
          candidates: candidates
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // CALLBACKS

  isUpdatingCallback(isUpdating) {
    this.setState({
      isUpdating: isUpdating
    });
  }

  showAlert(message) {
    this.setState({
      alert: message
    });
  }

  deleteAlert() {
    this.setState({ alert: null });
  }

  home() {
    this.setState({ appState: 'landingPage' });
  }

  showRegistrationPagePage() {
    this.setState({ appState: 'registrationPage' });
  }

  showVotingPage() {
    this.setState({ appState: 'votingPage' });
  }

  showLearnMorePage() {
    this.setState({ appState: 'learnMorePage' });
  }

  showBugReportPage() {
    this.setState({ appState: 'bugReportPage' });
  }

  showFeatureRequestPage() {
    this.setState({ appState: 'featureRequestPage' });
  }

  signOut() {
    localStorage.removeItem('access_token');
    this.setState({
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

    if (this.state.appState === 'landingPage') {
      return (
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showRegistrationPagePage={this.showRegistrationPagePage}
            showVotingPage={this.showVotingPage}
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
              contributor={null}
              candidates={this.state.candidates} />
          }
        </Container>
      );
    } else if (this.state.appState === 'registrationPage') {
      return(
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showRegistrationPagePage={this.showRegistrationPagePage}
            showVotingPage={this.showVotingPage}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <RegistrationPage
            contributor={this.state.contributor}
            updateState={this.updateState}
            signOut={this.signOut}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        </Container>
      );
    } else if (this.state.appState === 'votingPage') {
      return(
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showRegistrationPagePage={this.showRegistrationPagePage}
            showVotingPage={this.showVotingPage}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <Voting
            contributor={this.state.contributor}
            candidates={this.state.candidates}
            updateState={this.updateState}
            signOut={this.signOut}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        </Container>
      );
    } else if (this.state.appState === 'learnMorePage') {
      return(
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showRegistrationPagePage={this.showRegistrationPagePage}
            showVotingPage={this.showVotingPage}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <LearnMorePage contributor={this.state.contributor} />
        </Container>
      );
    } else if (this.state.appState === 'bugReportPage') {
      return(
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showRegistrationPagePage={this.showRegistrationPagePage}
            showVotingPage={this.showVotingPage}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <BugReportPage
            contributor={this.state.contributor}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        </Container>
      );
    } else if (this.state.appState === 'featureRequestPage') {
      return(
        <Container>
          <Header
            contributor={this.state.contributor}
            home={this.home}
            showRegistrationPagePage={this.showRegistrationPagePage}
            showVotingPage={this.showVotingPage}
            showLearnMorePage={this.showLearnMorePage}
            showBugReportPage={this.showBugReportPage}
            showFeatureRequestPage={this.showFeatureRequestPage} />
          {this.state.alert !== null &&
            <AlertMessage
              alert={this.state.alert}
              deleteAlert={this.deleteAlert} />
          }
          <FeatureRequestPage
            contributor={this.state.contributor}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        </Container>
      );
    } else if (this.state.appState === 'loadingPage') {
      return(
        <LoadingSpinner />
      );
    }
  }
}

export default App;
