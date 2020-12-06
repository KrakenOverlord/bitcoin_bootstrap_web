import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

class UsernameButton extends React.Component {
  constructor(props) {
    super(props);

    this.api_url = process.env.REACT_APP_API_GATEWAY + "/api";
  }

  vote(new_candidate_username) {
    this.props.isUpdatingCallback(new_candidate_username);

    this.print("Calling Vote");
    axios.post(this.api_url, {
      command: 'Vote',
      access_token: this.props.contributor.access_token,
      vote: new_candidate_username
    })
    .then((res) => {
      var response = res.data;
      this.print("vote response: " + JSON.stringify(response));

      if (response.error) {
        this.handleError(response.error_code, "Could not record the vote. Please try again later.");
      } else {
        this.props.updateState(response.contributor, response.candidates, { variant: 'success', message: 'You have successfully voted for ' + new_candidate_username});
      }
    })
    .catch((error) => {
      this.print(error);
      this.handleError(100, "Could not record the vote. Please try again later.");
    })
    .then(() => {
      this.props.isUpdatingCallback('');
    });
  }

  handleError(code, message) {
    if (code === 0 || code === 1) {
      this.props.signOut();
    } else {
      this.props.showAlert({ variant: 'danger', message: message });
    }
  }

  print(message) {
    if (process.env.REACT_APP_DEVELOPMENT) {
      console.log(message);
    }
  }

  render() {
    this.print("---UsernameButton");

    const signedIn = this.props.contributor !== null;
    const candidateUsername = this.props.candidate.username;
    const isUpdating = this.props.isUpdating;

    return (
      <>
        { /* NOT SIGNED IN **************************************************/ }
        { /* no donation URL */ }
        {!signedIn && this.props.candidate.donation_url === undefined &&
          <a style={{ fontWeight: 'bold' }} href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{candidateUsername}</a>
        }

        { /* has donation URL */ }
        {!signedIn && this.props.candidate.donation_url !== undefined &&
          <>
          <a style={{ fontWeight: 'bold' }} href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{candidateUsername}</a>
          <span> - </span>
          <Button target="_blank" rel="noopener noreferrer" size="sm" href={this.props.candidate.donation_url} variant="success">Donate</Button>
          </>
        }
        { /*******************************************************************/}


        { /* SIGNED IN ******************************************************/ }
        { /* not updating and didn't vote for this candidate */ }
        {signedIn && !isUpdating && this.props.contributor.voted_for !== candidateUsername &&
          <>
          <a style={{ fontWeight: 'bold' }} href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{candidateUsername}</a>
          <span> - </span>
          <Button variant="primary" size="sm" onClick={() => this.vote(candidateUsername)}>Vote</Button>
          </>
        }


        { /* not updating and voted for this candidate */ }
        {signedIn && !isUpdating && this.props.contributor.voted_for === candidateUsername &&
          <>
          <a style={{ fontWeight: 'bold' }} href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{candidateUsername}</a>
          <img className="ml-2" src={'vote.png'} alt="" height="30" width="30" />
          </>
        }

        { /* updating but didn't vote for this candidate */ }
        {signedIn && isUpdating && isUpdating !== candidateUsername &&
          <>
          <a style={{ fontWeight: 'bold' }} href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{candidateUsername}</a>
          <span> - </span>
          <Button disabled={true} variant="primary" size="sm">Vote</Button>
          </>
        }

        { /* updating and voting for this candidate */ }
        {signedIn && isUpdating && isUpdating === candidateUsername &&
          <>
          <a style={{ fontWeight: 'bold' }} href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{candidateUsername}</a>
          <img className="ml-2" src={'vote.png'} alt="" height="30" width="30" />
          </>
        }
      </>
    );
  }
}

export default UsernameButton;
