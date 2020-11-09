import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

function Introduction(props) {
  console.log("---Introduction");

  return (
    <Jumbotron>
      <h4>Bitcoin Bootstrap is a curated list of Bitcoin developers seeking financial support.</h4>
      <p className='mt-3'>
      Want to help fund a bitcoin developer but not sure who to help? Unless you are actively involved in Bitcoin development, it can be hard to figure out who is doing good work and deserves financial support. Who better to know who is doing good work and needs help than actual Bitcoin developers?
      </p>
      <p>
      This site let's Bitcoin developers vote on other Bitcoin developers that deserve financial help.
      </p>

      <p>
      Only contributors to the <a href='https://github.com/bitcoin/bitcoin' target="_blank" rel="noopener noreferrer">Bitcoin Github repository</a> can be listed.
      </p>
      Only <a href='https://github.com/bitcoin/bitcoin/graphs/contributors' target="_blank" rel="noopener noreferrer">contributors</a> can vote.

    </Jumbotron>
  );
}

export default Introduction;
