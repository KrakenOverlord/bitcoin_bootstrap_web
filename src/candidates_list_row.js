import React from 'react';
import Username from './username.js'

function CandidatesListRow(props) {
  console.log("---CandidatesListRow");

  return (
    <li className="media mt-3">
      <div className="img-with-text">
      <a href={props.candidate.html_url} target="_blank" rel="noopener noreferrer">
        <img
          src={props.candidate.avatar_url}
          alt=""
          height="64"
          width="64" />
      </a>
      <p>{props.candidate.votes}{' votes'}</p>
      </div>

      <div className="media-body ml-3 sm">
        <Username
          contributor={props.contributor}
          candidate={props.candidate}
          updateState={props.updateState}
          voting={props.voting}
          isVotingCallback={props.isVotingCallback} />
        <span>{props.candidate.description}</span>
      </div>
    </li>
  );
}

export default CandidatesListRow;
