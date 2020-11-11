import React from 'react';
import Card from 'react-bootstrap/Card';
import CandidatesList from './candidates_list.js';

class Voting extends React.Component {
  render() {
    console.log("---Voting");

    return(
      <>
        <Card bg='light' className='mt-3'>
          <Card.Body>
            <div className="mt-3">
              <ul>
                <li>You can vote for a candidate.</li>
                <li>Your vote is confidential. No one will ever know who you voted for.</li>
                <li>You can change your vote at any time.</li>
                <li>You can change your vote as many times as you wish.</li>
                <li>You can vote for yourself if you registered.</li>
              </ul>
            </div>
          </Card.Body>
        </Card>
        <CandidatesList contributor={this.props.contributor} candidates={this.props.candidates} updateState={this.props.updateState} voting={this.props.voting} isVotingCallback={this.props.isVotingCallback} />
      </>
    );
  }
}

export default Voting;
