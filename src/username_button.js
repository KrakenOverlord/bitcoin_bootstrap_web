import React from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';

class UsernameButton extends React.Component {
  constructor(props) {
    super(props);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  vote(new_candidate_username) {
    this.props.isVotingCallback(true, new_candidate_username);

    console.log("Calling vote");
    axios.post(this.api_url + "/vote?access_token=" + this.props.contributor.access_token +"&vote=" + new_candidate_username)
      .then((res) => {
        var response = res.data;
        console.log("vote response: " + JSON.stringify(response));

        if (response.error === true) {
          if (response.error_code === 1) {
            alert("Only contributors to the Bitcoin GitHub repository are allowed to sign in.");
          } else {
            console.log("Problem signing in: " + response.error);
          }
        } else {
          this.props.updateState(response.contributor, response.candidates, { variant: 'success', message: 'You have successfully voted for ' + new_candidate_username});
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.props.isVotingCallback(false, '');
      });
  }

  render() {
    console.log("---Username");

    return (
      <h5>
        { /* not signed in */ }
        {this.props.contributor === null &&
          <a href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{this.props.candidate.username}</a>
        }

        { /* signed in and voting state but didn't vote for this candidate */ }
        {this.props.contributor !== null && this.props.voting && this.props.voting_for !== this.props.candidate.username &&
          <Button
            disabled={true}
            variant="success"
            size="sm"
            onClick={() => this.vote(this.props.candidate.username)}>Vote for {this.props.candidate.username}
          </Button>
        }

        { /* signed in and voting state and voting for this candidate */ }
        {this.props.contributor !== null && this.props.voting && this.props.voting_for === this.props.candidate.username &&
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
            {' Voting for ' + this.props.candidate.username}
          </Button>
        }

        { /* signed in and not voting state and didn't vote for this candidate */ }
        {this.props.contributor !== null && !this.props.voting && this.props.contributor.voted_for !== this.props.candidate.username &&
          <Button
            variant="success"
            size="sm"
            onClick={() => this.vote(this.props.candidate.username)}>Vote for {this.props.candidate.username}
          </Button>
        }


        { /* signed in and not voting state and voted for this candidate */ }
        {this.props.contributor !== null && !this.props.voting && this.props.contributor.voted_for === this.props.candidate.username &&
          <>
          <span style={{ color: 'blue' }}>Voted for {this.props.candidate.username}</span>
          <img className="ml-2" src={'vote.png'} alt="" height="30" width="30" />
          </>
        }
      </h5>
    );
  }
}

export default UsernameButton;
