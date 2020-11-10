import React from 'react';
import Card from 'react-bootstrap/Card';
import CandidatesListRow from './candidates_list_row.js'

function CandidatesList(props) {
  console.log("---CandidatesList");

  return (
    <>
    {props.contributor &&
      <Card bg='secondary' className='mt-3'>
        <Card.Body>
          <div className="mt-3">
          <b>To Vote</b>
          <p>Simply press the "Vote for [username]" button.</p>
          <p />
          <ul>
          <li>You can change your vote at any time.</li>
          <li>You can change your vote as many times as you wish.</li>
          <li>Every contributor gets one vote.</li>
          <li>You can vote for yourself if you are registered.</li>
          </ul>
          </div>
        </Card.Body>
      </Card>
    }
    <ul className="list-unstyled mt-5">
      {props.candidates.map(candidate => (<CandidatesListRow key={candidate.username} contributor={props.contributor} candidate={candidate} updateState={props.updateState} />))}
    </ul>
    </>
  );
}

export default CandidatesList;
