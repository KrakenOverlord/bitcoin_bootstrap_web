import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

class UsernameButton extends React.Component {
  render() {
    this.print("---UsernameButton");

    const signedIn = this.props.contributor !== null;
    const candidateUsername = this.props.candidate.username;
    const isUpdating = this.props.isUpdating;

    return (
      <>
        { /* NOT SIGNED IN **************************************************/ }
        {!signedIn &&
          <>
          <a style={{ fontWeight: 'bold' }} href={this.props.candidate.html_url} target="_blank" rel="noopener noreferrer">{candidateUsername}</a>
          <span style={{ textAlign: "center", fontWeight: 'bold', color: 'gray', fontSize: '12px' }}> - {this.props.candidate.votes} votes</span>
          </>
        }


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
