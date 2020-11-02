import React from 'react';
import Button from 'react-bootstrap/Button'

function VoteButton(props) {
  return (
    <h5 className="mt-0 mb-1">
      {(props.user !== null && props.user.voted_for === props.candidate.username) &&
        <>
          Voted for {props.candidate.username}
          <img
            src={'vote.png'}
            alt=""
            height="64"
            width="64"
          />
        </>
        }
      {(props.user !== null && props.user.voted_for !== props.candidate.username) &&
        <Button className='mt-3' size="m" onClick={() => props.vote(props.candidate.username)}>Vote for {props.candidate.username}</Button>
      }
      {props.user === null &&
        <a className='mt-3' href={props.candidate.html_url} target="_blank" rel="noopener noreferrer">{props.candidate.username}</a>
      }
    </h5>
  );
}

export default VoteButton;
