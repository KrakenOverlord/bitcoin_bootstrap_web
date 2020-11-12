import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

function Introduction(props) {
  console.log("---Introduction");

  return (
    <Jumbotron className="mt-3">
      <h4>Bitcoin Bootstrap is a curated list of Bitcoin developers seeking financial help.</h4>
      <p className='mt-3'>
        <a href='https://github.com/bitcoin/bitcoin/graphs/contributors' target="_blank" rel="noopener noreferrer">Contributors</a> to the <a href='https://github.com/bitcoin/bitcoin' target="_blank" rel="noopener noreferrer">Bitcoin GitHub repository</a> can register to be listed and vote for those they believe deserve funding.
      </p>
      <p>

      </p>
      <p>
        The list is displayed below and ordered by highest number of votes to lowest.
      </p>
      <p>
        <Button variant="primary">How it works</Button>
      </p>
    </Jumbotron>
  );
}

export default Introduction;
