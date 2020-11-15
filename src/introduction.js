import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

function Introduction(props) {
  console.log("---Introduction");

  return (
    <Jumbotron className="mt-3">
      <h4>Bitcoin Bootstrap is a curated list of Bitcoin developers seeking financial help.</h4>
      <p className='mt-3'>
        <a href='https://github.com/bitcoin/bitcoin/graphs/contributors' target="_blank" rel="noopener noreferrer">Contributors</a> to the <a href='https://github.com/bitcoin/bitcoin' target="_blank" rel="noopener noreferrer">Bitcoin GitHub repository</a> can register to be listed, and contributors can vote for those they believe deserve funding.
      </p>

      {props.numCandidates === 0 &&
        <p>
          No contributor has registered to be a candidate yet. Be the first!
          Just sign in and hit the register button and you will be listed.
        </p>
      }

      {props.numCandidates !== 0 &&
        <p>
          The list is displayed below and ordered by highest number of votes to lowest.
        </p>
      }

      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Jumbotron>
  );
}

export default Introduction;
