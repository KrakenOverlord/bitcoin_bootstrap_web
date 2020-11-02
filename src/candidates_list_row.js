import React from 'react';
import VoteButton from './vote_button.js'

function CandidatesListRow(props) {
  return (
    <li className="media mt-3">
      <div className="img-with-text">
      <img
        src={props.candidate.avatar_url}
        alt=""
        height="64"
        width="64"
        href={props.candidate.html_url}
      />
      <p>{props.candidate.votes}{' votes'}</p>
      </div>

      <div className="media-body ml-3">
        <VoteButton user={props.user} candidate={props.candidate} vote={props.vote} />
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </div>
    </li>
  );
}

export default CandidatesListRow;
