import React from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Header from './header.js';
import Introduction from './introduction.js';
import CandidatesList from './candidates/candidates_list.js';
import RegisterPage from './registration/register_page.js';
import RegistrationPage from './registration/registration_page.js';
import VotingPage from './voting_page.js';
import LearnMorePage from './learn_more_page.js';
import BugReportPage from './bug_report_page.js';
import FeatureRequestPage from './feature_request_page.js';
import LoadingSpinner from './utils/loading_spinner.js';
import AlertMessage from './utils/alert_message.js';
import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editColors: false,
      headerColor: '#5e5e5e',
      cardColor: '#d9d9d9',
      isUpdating: null,
      alert: null,
      activePage: 'homePage', // ['homePage', 'registerPage', 'registrationPage', 'votingPage', 'learnMorePage', 'bugReportPage', 'featureRequestPage']
      contributor: null,
      candidates: [],
      description: '',
      donationUrl: ''
    };

    this.isUpdatingCallback = this.isUpdatingCallback.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDonationUrlChange = this.handleDonationUrlChange.bind(this);
    this.updateState = this.updateState.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
    this.showPage = this.showPage.bind(this);
    this.vote = this.vote.bind(this);

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

    this.print("Calling SigninWithCode");
    axios.post(this.api_url, {
      command: 'SigninWithCode',
      code: code
    })
    .then((res) => {
      var response = res.data;
      this.print("SigninWithCode response: " + JSON.stringify(response));

      if (response.error) {
        if (response.error_code === 1) {
          this.showAlert({ variant: 'info', message: "Only contributors to the Bitcoin GitHub repository are allowed to sign in. If you are a contributor and still can't sign in, please see the Help section of the Learn more page." });
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
      this.print(error);
    });
  }

  signInWithAccessToken(access_token) {
    this.print("Calling SigninWithAccessToken");
    axios.post(this.api_url, {
      command: 'SigninWithAccessToken',
      access_token: access_token
    })
    .then((res) => {
      var response = res.data;
      this.print("SigninWithAccessToken response: " + JSON.stringify(response));

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
      this.print(error);
    });
  }

  getCandidates() {
    this.print("Calling GetCandidates");
    axios.post(this.api_url, {
      command: 'GetCandidates'
    })
    .then((res) => {
      var response = res.data;
      this.print("GetCandidates response: " + JSON.stringify(response));

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
      this.print(error);
    });
  }

  vote(new_candidate_username) {
    this.isUpdatingCallback(new_candidate_username);

    this.print("Calling Vote");
    axios.post(this.api_url, {
      command: 'Vote',
      access_token: this.state.contributor.access_token,
      vote: new_candidate_username
    })
    .then((res) => {
      var response = res.data;
      this.print("vote response: " + JSON.stringify(response));

      if (response.error) {
        this.handleError(response.error_code, "Could not record the vote. Please try again later.");
      } else {
        let candidates = response.candidates.sort(function(a, b) { return b.votes - a.votes });
        this.setState({
          contributor: response.contributor,
          candidates: candidates,
          alert: { variant: 'success', message: 'You have successfully voted for ' + new_candidate_username }
        });
      }
    })
    .catch((error) => {
      this.print(error);
      this.handleError(100, "Could not record the vote. Please try again later.");
    })
    .then(() => {
      this.isUpdatingCallback('');
    });
  }

  handleError(code, message) {
    if (code === 0 || code === 1) {
      this.signOut();
    } else {
      this.showAlert({ variant: 'danger', message: message });
    }
  }

  print(message) {
    if (process.env.REACT_APP_DEVELOPMENT) {
      console.log(message);
    }
  }

  // CALLBACKS

  handleDescriptionChange(event) {
    let value = event.target.value;

    if (value.indexOf('\n') > -1) {
      return;
    }

    this.setState({description: value});
  }

  handleDonationUrlChange(event) {
    let value = event.target.value;

    if (value.indexOf('\n') > -1) {
      return;
    }

    this.setState({donationUrl: value});
  }

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

  showPage(page) {
    if (page === 'registerPage' || page === 'registrationPage') {
      this.setState({
        description: this.state.contributor.description,
        donationUrl: this.state.contributor.donation_url,
        activePage: page
      })
    } else {
      this.setState({ activePage: page });
    }
  }

  signOut() {
    localStorage.removeItem('access_token');
    this.setState({
      contributor: null
    }, this.homePage);
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
    this.print("---App");

    let activePage = this.state.activePage;
    let candidates = this.state.candidates.slice();

    // Add a dummy candidate for display purposes if none exist yet.
    if (activePage === "homePage" && candidates.length === 0) {
      candidates.push({
        username: 'BitcoinBootstrap',
        avatar_url: 'https://avatars1.githubusercontent.com/u/74471859?v=4',
        contributions: 7,
        html_url: 'https://github.com/BitcoinBootstrap',
        votes: 23,
        donation_url: 'https://github.com/sponsors/BitcoinBootstrap',
        description: "This is an example of what a candidate listing will look like when you register. This example will be automatically deleted when the first contributor signs up. Your GitHub profile picture and username are automatically displayed and linked to your GitHub account. You’ll want to describe your previous contributions to Bitcoin, and what you're currently working on. Don't forget to describe how people can fund you. You can put more information on your GitHub profile page, or link to your GitHub sponsor page, or some other information page like https://myinfopage.com, or just paste a bitcoin address here. It's up to you. Once you are receiving enough funding to survive, please unregister so that others can receive the help they need."
      });
    }

    return (
      <>
      <Header
        activePage={activePage}
        contributor={this.state.contributor}
        showPage={this.showPage} />
      <Container>
        {this.state.alert &&
          <AlertMessage
            alert={this.state.alert}
            deleteAlert={this.deleteAlert} />
        }

        {activePage === 'homePage' &&
        <>
          <Introduction numCandidates={candidates.length} showPage={this.showPage} />

          <CandidatesList
            contributor={null}
            candidates={candidates} />
        </>
        }

        {activePage === 'registerPage' &&
          <RegisterPage
            contributor={this.state.contributor}
            updateState={this.updateState}
            signOut={this.signOut}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback}
            showPage={this.showPage}
            description={this.state.description}
            donationUrl={this.state.donationUrl}
            handleDescriptionChange={this.handleDescriptionChange}
            handleDonationUrlChange={this.handleDonationUrlChange} />
        }

        {activePage === 'registrationPage' &&
          <RegistrationPage
            contributor={this.state.contributor}
            updateState={this.updateState}
            signOut={this.signOut}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback}
            showPage={this.showPage}
            description={this.state.description}
            donationUrl={this.state.donationUrl}
            handleDescriptionChange={this.handleDescriptionChange}
            handleDonationUrlChange={this.handleDonationUrlChange} />
        }

        {activePage === 'votingPage' &&
          <VotingPage
            contributor={this.state.contributor}
            candidates={candidates}
            vote={this.vote}
            isUpdating={this.state.isUpdating} />
        }

        {activePage === 'learnMorePage' &&
          <LearnMorePage contributor={this.state.contributor} />
        }

        {activePage === 'bugReportPage' &&
          <BugReportPage
            contributor={this.state.contributor}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        }

        {activePage === 'featureRequestPage' &&
          <FeatureRequestPage
            contributor={this.state.contributor}
            showAlert={this.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        }

        {activePage === 'loadingPage' &&
          <LoadingSpinner />
        }
      </Container>
      </>
    );
  }
}

export default App;
