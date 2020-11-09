import React from 'react';
import VoteButton from './vote_button.js'

function CandidatesListRow(props) {
  console.log("---CandidatesListRow");

  return (
    <li className="media mt-3">
      <div className="img-with-text">
      <img src={props.candidate.avatar_url} alt="" height="64" width="64" href={props.candidate.html_url} />
      <p>{props.candidate.votes}{' votes'}</p>
      </div>

      <div className="media-body ml-3">
        <VoteButton contributor={props.contributor} candidate={props.candidate} updateState={props.updateState} />
        <span>{props.candidate.blurb}</span>
      </div>
    </li>
  );
}

export default CandidatesListRow;
