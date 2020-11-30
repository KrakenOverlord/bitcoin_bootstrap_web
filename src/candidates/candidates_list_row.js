import React from 'react';
import UsernameButton from './username_button.js'

function CandidatesListRow(props) {
  console.log("---CandidatesListRow");

  return (
    <li className="media mt-3">
      <div className="img-with-text">
      {props.candidate.avatar_url !== '' ?
        <a href={props.candidate.html_url} target="_blank" rel="noopener noreferrer">
          <img
            src={props.candidate.avatar_url}
            alt=""
            height="64"
            width="64" />
        </a>
        :
        <img
          src='anon-contributor.png'
          alt=""
          height="64"
          width="64" />
      }

      <p style={{ textAlign: "center", fontWeight: 'bold', color: 'red', fontSize: '12px' }}>{props.candidate.votes}{' votes'}
      </p>
      </div>

      <div className="media-body ml-3 sm">
        <UsernameButton
          contributor={props.contributor}
          candidate={props.candidate}
          updateState={props.updateState}
          signOut={props.signOut}
          showAlert={props.showAlert}
          isUpdating={props.isUpdating}
          isUpdatingCallback={props.isUpdatingCallback} />
        <p>
          <span>{props.candidate.description}</span>
        </p>
      </div>
    </li>
  );
}

export default CandidatesListRow;
