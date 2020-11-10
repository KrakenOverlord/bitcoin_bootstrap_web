import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

class VoteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      voting: false
    }

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  vote(new_candidate_username) {
    this.setState({ voting: true });
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
          this.props.updateState(response.contributor, response.candidates, { variant: 'success', title: 'You have successfully voted for ' + new_candidate_username});
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.setState({ voting: false });
      });
  }

  render() {
    console.log("---VoteButton");

    return (
      <h5>
        {(this.props.contributor !== null && this.props.contributor.voted_for === this.props.candidate.username) &&
          <>
            Voted for {this.props.candidate.username}
            <img src={'vote.png'} alt="" height="48" width="48" />
          </>
          }
        {(this.props.contributor !== null && this.props.contributor.voted_for !== this.props.candidate.username) &&
          <Button disabled={this.state.voting} size="m" onClick={() => this.vote(this.props.candidate.username)}>Vote for {this.props.candidate.username}</Button>
        }
        {this.props.contributor === null &&
          <a href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{this.props.candidate.username}</a>
        }
      </h5>
    );
  }
}

export default VoteButton;
