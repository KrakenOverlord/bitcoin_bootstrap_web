import React from 'react';
import CandidatesListRow from './candidates_list_row.js'

function CandidatesList(props) {
  return (
    <ul className="list-unstyled">
      {props.candidates.map(candidate => (<CandidatesListRow key={candidate.username} user={props.user} candidate={candidate} vote={props.vote} />))}
    </ul>
  );
}

export default CandidatesList;
