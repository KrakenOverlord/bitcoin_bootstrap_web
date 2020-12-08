import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from './header.js';
import Introduction from './introduction.js';
import CandidatesList from './candidates/candidates_list.js';
import RegisterPage from './registration/register_page.js';
import RegistrationPage from './registration/registration_page.js';
import VotingPage from './voting_page.js';
import LearnMorePage from './learn_more_page.js';
import BugReportPage from './bug_report_page.js';
import FeatureRequestPage from './feature_request_page.js';
import AlertMessage from './utils/alert_message.js';
import { signInWithCode, signInWithAccessToken, getCandidates, register, updateDescription, updateDonationUrl, unregister, vote, bugReport, featureRequest } from './api.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: null,
      alert: null,
      activePage: 'homePage', // ['homePage', 'registerPage', 'registrationPage', 'votingPage', 'learnMorePage', 'bugReportPage', 'featureRequestPage']
      contributor: null,
      candidates: [],
      description: '',
      originalDescription: '',
      donationUrl: '',
      originalDonationUrl: ''
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDonationUrlChange = this.handleDonationUrlChange.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
    this.showPage = this.showPage.bind(this);
    this.signInWithCode = signInWithCode.bind(this);
    this.signInWithAccessToken = signInWithAccessToken.bind(this);
    this.getCandidates = getCandidates.bind(this);
    this.register = register.bind(this);
    this.updateDescription = updateDescription.bind(this);
    this.updateDonationUrl = updateDonationUrl.bind(this);
    this.unregister = unregister.bind(this);
    this.vote = vote.bind(this);
    this.bugReport = bugReport.bind(this);
    this.featureRequest = featureRequest.bind(this);

    this.api_url = process.env.REACT_APP_API_GATEWAY + "/api";
  }

  componentDidMount() {
    const code = this.getCode();
    if (code !== null) {
      this.signInWithCode(code);
    } else if (this.getAccessToken() !== null) {
      this.signInWithAccessToken(this.getAccessToken());
    }

    this.getCandidates();
  }

  getCode() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    window.history.pushState({}, null, 'home');
    return code;
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
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
        description: "This is an example of what a candidate listing looks like after you register. This example will be automatically deleted when the first real contributor signs up. Your GitHub profile picture and username are automatically displayed and linked to your GitHub account. The donate button links to a URL that you specify where people can make donations. Alternatively, you can include donation information right in the listing itself. You’ll want to describe your previous contributions to Bitcoin, and what you're currently working on. Once you are receiving enough funding to survive, please unregister so that others can receive the help they need."
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
            isUpdating={this.state.isUpdating}
            register={this.register}
            description={this.state.description}
            donationUrl={this.state.donationUrl}
            handleDescriptionChange={this.handleDescriptionChange}
            handleDonationUrlChange={this.handleDonationUrlChange} />
        }

        {activePage === 'registrationPage' &&
          <RegistrationPage
            contributor={this.state.contributor}
            isUpdating={this.state.isUpdating}
            unregister={this.unregister}
            updateDescription={this.updateDescription}
            updateDonationUrl={this.updateDonationUrl}
            description={this.state.description}
            originalDescription={this.state.originalDescription}
            donationUrl={this.state.donationUrl}
            originalDonationUrl={this.state.originalDonationUrl}
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
            isUpdating={this.state.isUpdating}
            bugReport={this.bugReport} />
        }

        {activePage === 'featureRequestPage' &&
          <FeatureRequestPage
            contributor={this.state.contributor}
            isUpdating={this.state.isUpdating}
            featureRequest={this.featureRequest} />
        }
      </Container>
      </>
    );
  }
}

export default App;
