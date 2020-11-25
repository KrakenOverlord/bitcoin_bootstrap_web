import React from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';

class UsernameButton extends React.Component {
  constructor(props) {
    super(props);

    this.api_url = process.env.REACT_APP_API_GATEWAY;
  }

  vote(new_candidate_username) {
    this.props.isUpdatingCallback(new_candidate_username);

    console.log("Calling Vote");
    axios.post(this.api_url, {
      command: 'Vote',
      access_token: this.props.contributor.access_token,
      vote: new_candidate_username
    })
    .then((res) => {
      var response = res.data;
      console.log("vote response: " + JSON.stringify(response));

      if (response.error) {
        this.handleError(response.error_code, "Could not record the vote. Please try again later.");
      } else {
        this.props.updateState(response.contributor, response.candidates, { variant: 'success', message: 'You have successfully voted for ' + new_candidate_username});
      }
    })
    .catch((error) => {
      console.log(error);
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

  render() {
    console.log("---UsernameButton");

    const signedIn = this.props.contributor !== null;
    const candidateUsername = this.props.candidate.username;
    const isUpdating = this.props.isUpdating;
    let anonymous = false;
    if (this.props.candidate.contributor_type === "Anonymous") {
      anonymous = true;
    }

    return (
      <>
        { /* not signed in */ }
        {!signedIn && !anonymous &&
          <a style={{ fontWeight: 'bold' }} href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{candidateUsername}</a>
        }

        { /* not signed in */ }
        {!signedIn && anonymous &&
          <>
            <span style={{ fontWeight: 'bold' }}>{candidateUsername}</span>
          </>
        }

        { /* signed in and not voting state and didn't vote for this candidate */ }
        {signedIn && !isUpdating && this.props.contributor.voted_for !== candidateUsername &&
          <Button
            variant="success"
            size="sm"
            onClick={() => this.vote(candidateUsername)}>Vote for {candidateUsername}
          </Button>
        }


        { /* signed in and not voting state and voted for this candidate */ }
        {signedIn && !isUpdating && this.props.contributor.voted_for === candidateUsername &&
          <>
          <b><span style={{ color: 'DodgerBlue' }}>Voted for {candidateUsername}</span></b>
          <img className="ml-2" src={'vote.png'} alt="" height="30" width="30" />
          </>
        }

        { /* signed in and voting state but didn't vote for this candidate */ }
        {signedIn && isUpdating && isUpdating !== candidateUsername &&
          <Button
            disabled={true}
            variant="success"
            size="sm"
            onClick={() => this.vote(candidateUsername)}>Vote for {candidateUsername}
          </Button>
        }

        { /* signed in and voting state and voting for this candidate */ }
        {signedIn && isUpdating && isUpdating === candidateUsername &&
          <Button
          disabled={true}
          variant="success"
          size="sm">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {' Voting for ' + candidateUsername}
          </Button>
        }
      </>
    );
  }
}

export default UsernameButton;
