import axios from 'axios';

export function signInWithCode(code) {
  this.print("Calling SigninWithCode");

  axios.post(this.api_url, {
    command: 'SigninWithCode',
    code: code
  })
  .then((res) => {
    var response = res.data;
    this.print("SigninWithCode response: " + JSON.stringify(response));

    if (response.error) {
      if (response.error_code === 0) {
        this.setState({ alert: { variant: 'danger', message: "Unable to authenticate. Please try again later." }});
        this.signOut();
      }
      else if (response.error_code === 1) {
        this.showAlert({ variant: 'info', message: "Only contributors to the Bitcoin GitHub repository are allowed to sign in. If you are a contributor and still can't sign in, please see the Help section of the Learn more page." });
      } else {
        this.signOut();
      }
    } else {
      localStorage.setItem('access_token', response.contributor.access_token);
      this.setState({
        contributor:  response.contributor,
        originalDescription: response.contributor.description,
        originalDonationUrl: response.contributor.donation_url
      });
    }
  })
  .catch((error) => {
    this.print(error);
  });
}

export function signInWithAccessToken(access_token) {
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
        contributor:  response.contributor,
        originalDescription: response.contributor.description,
        originalDonationUrl: response.contributor.donation_url
      });
    }
  })
  .catch((error) => {
    this.print(error);
  });
}

export function getCandidates() {
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

export function register() {
  this.setState({
    isUpdating: { action: 'registering' }
  });

  this.print("Calling Register");
  axios.post(this.api_url, {
    command: "Register",
    access_token: this.state.contributor.access_token,
    description: this.state.description,
    donation_url: this.state.donationUrl
  })
  .then((res) => {
    var response = res.data;
    this.print("register response: " + JSON.stringify(response));

    if (response.error === true) {
      this.handleError(response.error_code, "Could not register. Please try again later.");
    } else {
      let alert = {
        variant: 'success',
        message: 'Registration successful! You have been added to the candidates list.'
      };

      this.setState({
        contributor: response.contributor,
        candidates: response.candidates,
        originalDescription: response.contributor.description,
        originalDonationUrl: response.contributor.donation_url,
        alert: alert,
        activePage: "homePage"
      });
    }
  })
  .catch((error) => {
    this.print(error);
    this.handleError(100, "Could not register. Please try again later.");
  })
  .then(() => {
    this.setState({
      isUpdating: null
    });
  });
}

export function updateDescription() {
  this.setState({
    isUpdating: { action: 'updatingDescription' }
  });

  this.print("Calling UpdateDescription");
  axios.post(this.api_url, {
    command: "UpdateDescription",
    access_token: this.state.contributor.access_token,
    description: this.state.description
  })
  .then((res) => {
    var response = res.data;
    this.print("UpdateDescription response: " + JSON.stringify(response));

    if (response.error) {
      this.handleError(response.error_code, "Could not update description. Please try again later.");
    } else {
      this.setState({
        contributor: response.contributor,
        candidates: response.candidates,
        originalDescription: response.contributor.description,
        alert: { variant: 'success', message: 'You have successfully updated your description.' }
      });
    }
  })
  .catch((error) => {
    this.print(error);
    this.handleError(100, "Could not update description. Please try again later.");
  })
  .then(() => {
    this.setState({
      isUpdating: null
    });
  });
}

export function updateDonationUrl() {
  this.setState({
    isUpdating: { action: 'updatingDonationUrl' }
  });

  this.print("Calling UpdateDonationUrl");
  axios.post(this.api_url, {
    command: "UpdateDonationUrl",
    access_token: this.state.contributor.access_token,
    donation_url: this.state.donationUrl
  })
  .then((res) => {
    var response = res.data;
    this.print("UpdateDonationUrl response: " + JSON.stringify(response));

    if (response.error) {
      this.handleError(response.error_code, "Could not update donation URL. Please try again later.");
    } else {
      this.setState({
        contributor: response.contributor,
        candidates: response.candidates,
        originalDonationUrl: response.contributor.donation_url,
        alert: { variant: 'success', message: 'You have successfully updated your donation URL.' }
      });
    }
  })
  .catch((error) => {
    this.print(error);
    this.handleError(100, "Could not update donation URL. Please try again later.");
  })
  .then(() => {
    this.setState({
      isUpdating: null
    });
  });
}

export function unregister() {
  this.setState({
    isUpdating: { action: 'unregistering' }
  });

  this.print("Calling Unregister");
  axios.post(this.api_url, {
    command: "Unregister",
    access_token: this.state.contributor.access_token
  })
  .then((res) => {
    var response = res.data;
    this.print("Unregister response: " + JSON.stringify(response));

    if (response.error) {
      this.handleError(response.error_code, "Could not unregister. Please try again later.");
    } else {
      let alert = {
        variant: 'success',
        message: 'Successfully unregistered! You have been removed from the candidates list.'
      };

      this.setState({
        contributor: response.contributor,
        candidates: response.candidates,
        alert: alert,
        activePage: "homePage"
      });
    }
  })
  .catch((error) => {
    this.print(error);
    this.handleError(100, "Could not unregister. Please try again later.");
  })
  .then(() => {
    this.setState({
      isUpdating: null
    });
  });
}

export function vote(new_candidate_username) {
  this.setState({
    isUpdating: { action: 'voting', candidateUsername: new_candidate_username }
  });

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
    this.setState({
      isUpdating: null
    });
  });
}

export function bugReport(contributor, description) {
  this.setState({
    isUpdating: { action: 'reportingBug' }
  });

  // Get username if a contributor exists
  let username = null;
  if (contributor) {
    username = contributor.username;
  }

  this.print("Calling CreateBugReport");
  axios.post(this.api_url, {
    command: 'CreateBugReport',
    username: username,
    description: description
  })
  .then((res) => {
    var response = res.data;
    this.print("CreateBugReport response: " + JSON.stringify(response));

    if (response.error) {
      this.props.showAlert({ variant: 'danger', message: "Could not record the bug report. Please try again later." });
    } else {
      this.showAlert({ variant: 'success', message: "Thanks for the bug report!" });
    }
  })
  .catch((error) => {
    this.print(error);
    this.showAlert({ variant: 'danger', message: "Could not record the bug report. Please try again later." });
  })
  .then(() => {
    this.setState({
      isUpdating: null
    });
  });
}

export function featureRequest(contributor, description) {
  this.setState({
    isUpdating: { action: 'requestingFeature' }
  });

  // Get username if a contributor exists
  let username = null;
  if (contributor) {
    username = contributor.username;
  }

  this.print("Calling CreateFeatureRequest");
  axios.post(this.api_url, {
    command: 'CreateFeatureRequest',
    username: username,
    description: description
  })
  .then((res) => {
    var response = res.data;
    this.print("CreateFeatureRequest response: " + JSON.stringify(response));

    if (response.error) {
      this.showAlert({ variant: 'danger', message: "Could not record the feature request. Please try again later." });
    } else {
      this.showAlert({ variant: 'success', message: "Thanks for the feature request!" });
    }
  })
  .catch((error) => {
    this.print(error);
    this.showAlert({ variant: 'danger', message: "Could not record the feature request. Please try again later." });
  })
  .then(() => {
    this.setState({
      isUpdating: null
    });
  });
}
