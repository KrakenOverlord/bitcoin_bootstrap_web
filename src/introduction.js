import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function print(message) {
  if (process.env.REACT_APP_DEVELOPMENT) {
    console.log(message);
  }
}

function Introduction(props) {
  print("---Introduction");
  return (
    <Card className="mt-3" style={{backgroundColor: '#d9d9d9'}}>
      <Card.Body>
      <p className="mt-2" style={{ textAlign: "center", fontWeight: 'bold', fontSize: '20px', color: "#5e5e5e" }}>
      A curated list of Bitcoin developers seeking funding.
      </p>
      <b></b>
        <p />Many people want to give back to the Bitcoin community by helping to support a Bitcoin developer.
        But there are over 750
        <span>
          <a href='https://github.com/bitcoin/bitcoin/graphs/contributors'
            target="_blank"
            rel="noopener noreferrer"> contributors</a>
          {' '}to the
          {' '}<a href='https://github.com/bitcoin/bitcoin'
            target="_blank"
            rel="noopener noreferrer">Bitcoin repository</a>
        </span>
        . How do you figure out which one to help?

        <p />You can find compiled lists of developers online that are looking for help.
        But these listings consist mostly of developers describing themselves and the technical projects they are working on.
        The average person doesn't have the technical knowledge necessary to evaluate these listings.
        Ideally we could get the opinions of people deeply involved in Bitcoin development on who we should help.
        This is where Bitcoin Bootstrap steps in.

        <p />Bitcoin Bootstrap uses a voting system to leverage the knowledge of Bitcoin developers <i>as a whole</i> to provide guidance.
        Contributors to the Bitcoin repository can register as candidates for funding, and contributors can vote for them.
        Each vote represents a developers cumulative knowledge on who is best working towards the desired goals.

        <p />See the list below.

        <p>
          <Button className="mt-3" href="#learn-more" variant="primary" onClick={() => props.showPage('learnMorePage')}>Learn more</Button>
        </p>
      </Card.Body>
    </Card>
  );
}

export default Introduction;
