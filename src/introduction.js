import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

function Introduction(props) {
  return (
    <Jumbotron>
      <h3>A curated list of Bitcoin developers seeking financial support.</h3>
      <p>
      Want to help fund a bitcoin developer so they can continue working on Bitcoin full-time but not sure who to help? Unless you are actively involved in Bitcoin development, it can be hard to figure out who is doing good work and deserves financial support.
      </p>
      <p>
      To solve this problem, this site let's actual Bitcoin developers vote on other Bitcoin developers that they think deserve financial help.
      </p>

      <p>
      Only people who have contributed to the <a href='https://github.com/bitcoin/bitcoin' target="_blank" rel="noopener noreferrer">Bitcoin Github repository</a> can be listed here, and only <a href='https://github.com/bitcoin/bitcoin/graphs/contributors' target="_blank" rel="noopener noreferrer">contributors</a> to the repository are allowed to vote.
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Jumbotron>
  );
}

export default Introduction;
