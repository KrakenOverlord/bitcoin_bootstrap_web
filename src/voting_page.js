import React from 'react';
import CandidatesList from './candidates/candidates_list.js';

function print(message) {
  if (process.env.REACT_APP_DEVELOPMENT) {
    console.log(message);
  }
}

function VotingPage(props) {
  print("---Voting");

  return(
    <CandidatesList
      contributor={props.contributor}
      candidates={props.candidates}
      updateState={props.updateState}
      signOut={props.signOut}
      showAlert={props.showAlert}
      isUpdating={props.isUpdating}
      isUpdatingCallback={props.isUpdatingCallback} />
  );
}

export default VotingPage;
