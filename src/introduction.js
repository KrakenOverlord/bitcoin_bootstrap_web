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
        <p />Many people want to give back to the Bitcoin community by helping to fund a Bitcoin developer.
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
        . How do you know which one to help?


        <p />Some people have compiled lists of developers that are looking for help, but they sometimes contain people working on their own projects, and they all just contain self-descriptions by the developers themselves.
        What is needed is expert guidance by people deeply involved in Bitcoins development.

        <p />That's where Bitcoin Bootstrap steps in. Bitcoin Bootstrap leverages the knowledge of the Bitcoin developers, the biggest experts of all, to provide guidance on funding.
        It's all done through a voting system which allows developers to vote for their favorite candidate. Each vote represents that developers cumulative knowledge on who is best working towards the desired goals, and thus most deserving of funding. The best candidates will rise to the top of the list.

        <p />Only contributors to the Bitcoin repository are allowed on the candidate list, and only contributors to the repository are allowed to vote on them.

        <p />See the list below.

        <p>
          <Button className="mt-3" href="#learn-more" variant="primary" onClick={() => props.showPage('learnMorePage')}>Learn more</Button>
        </p>
      </Card.Body>
    </Card>
  );
}

export default Introduction;
