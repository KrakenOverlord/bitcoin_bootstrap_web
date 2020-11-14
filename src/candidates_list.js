import React from 'react';
import CandidatesListRow from './candidates_list_row.js'

function CandidatesList(props) {
  console.log("---CandidatesList");

  return (
    <ul className="list-unstyled mt-5">
      {props.candidates.map(candidate => (<CandidatesListRow key={candidate.username} contributor={props.contributor} candidate={candidate} updateState={props.updateState} voting={props.voting} voting_for={props.voting_for} isVotingCallback={props.isVotingCallback} />))}
    </ul>
  );
}

export default CandidatesList;
