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
            {this.props.contributor.voted_for !== '' &&
              'You voted for ' + this.props.contributor.voted_for
            }
            </div>
          </Card.Body>
        </Card>
        <CandidatesList
          contributor={this.props.contributor}
          candidates={this.props.candidates}
          updateState={this.props.updateState}
          voting={this.props.voting}
          voting_for={this.props.voting_for}
          isVotingCallback={this.props.isVotingCallback} />
      </>
    );
  }
}

export default Voting;
