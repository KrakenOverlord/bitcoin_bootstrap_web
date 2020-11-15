import React from 'react';
import Card from 'react-bootstrap/Card';
import CandidatesList from './candidates_list.js';

function Voting(props) {
  console.log("---Voting");

  return(
    <>
      <Card bg='light' className='mt-3'>
        <Card.Body>
          <div className="mt-3">
          {props.contributor.voted_for !== '' &&
            'You voted for ' + props.contributor.voted_for
          }
          </div>
        </Card.Body>
      </Card>
      <CandidatesList
        contributor={props.contributor}
        candidates={props.candidates}
        updateState={props.updateState}
        isVoting={props.isVoting}
        isVotingCallback={props.isVotingCallback} />
    </>
  );
}

export default Voting;
