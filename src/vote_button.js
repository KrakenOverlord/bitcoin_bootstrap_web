import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

class VoteButton extends React.Component {
  constructor(props) {
    super(props);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  vote(new_candidate_username) {
    axios.post(this.api_url + "/vote?access_token=" + this.props.contributor.access_token +"&vote=" + new_candidate_username)
      .then((res) => {
        var response = res.data;
        console.log("vote response: " + JSON.stringify(response));
        this.props.updateState(response.contributor, response.candidates);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log("---VoteButton");

    return (
      <h5>
        {(this.props.contributor !== null && this.props.contributor.voted_for === this.props.candidate.username) &&
          <>
            Voted for {this.props.candidate.username}
            <img src={'vote.png'} alt="" height="64" width="64" />
          </>
          }
        {(this.props.contributor !== null && this.props.contributor.voted_for !== this.props.candidate.username) &&
          <Button size="m" onClick={() => this.vote(this.props.candidate.username)}>Vote for {this.props.candidate.username}</Button>
        }
        {this.props.contributor === null &&
          <a href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{this.props.candidate.username}</a>
        }
      </h5>
    );
  }
}

export default VoteButton;
