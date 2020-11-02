import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

function Introduction(props) {
  return (
    <Jumbotron>
      <h3>A curated list of Bitcoin developers seeking financial support.</h3>
      <p className='mt-3'>
      Want to help fund a bitcoin developer but not sure who to help? Unless you are actively involved in Bitcoin development, it can be hard to figure out who is doing good work and deserves financial support. Who better to know who is doing good work and needs help than actual Bitcoin developers?
      </p>
      <p>
      This site let's Bitcoin developers vote on other Bitcoin developers that deserve financial help.
      </p>

      <p>
      Only people who have contributed to the <a href='https://github.com/bitcoin/bitcoin' target="_blank" rel="noopener noreferrer">Bitcoin Github repository</a> can be listed here. Only <a href='https://github.com/bitcoin/bitcoin/graphs/contributors' target="_blank" rel="noopener noreferrer">contributors</a> to the repository are allowed to vote.
      </p>
    </Jumbotron>
  );
}

export default Introduction;
