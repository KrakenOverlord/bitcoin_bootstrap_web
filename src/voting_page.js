import React from 'react';
import CandidatesList from './candidates/candidates_list.js';

function VotingPage(props) {
  console.log("---Voting");

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
