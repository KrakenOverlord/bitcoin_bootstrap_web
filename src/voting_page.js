import React from 'react';
import Card from 'react-bootstrap/Card';
import CandidatesList from './candidates/candidates_list.js';

function VotingPage(props) {
  console.log("---Voting");

  return(
    <>
      <Card bg='light' className='mt-3'>
        <Card.Body>
          <div className="mt-3">
            { /* if they haven't voted yet */}
            {props.contributor.voted_for !== '' &&
              'You voted for ' + props.contributor.voted_for + "."
            }

            { /* if they've voted */}
            {props.contributor.voted_for === '' &&
              "You haven't voted for anyone yet."
            }
          </div>
        </Card.Body>
      </Card>
      <CandidatesList
        contributor={props.contributor}
        candidates={props.candidates}
        updateState={props.updateState}
        signOut={props.signOut}
        showAlert={props.showAlert}
        isUpdating={props.isUpdating}
        isUpdatingCallback={props.isUpdatingCallback} />
    </>
  );
}

export default VotingPage;
