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
        . Which one should you help?


        <p />There are online lists of developers looking for help. But they don't give you any indication of who deserves funding.
        Unless you’re already familiar with the technology and working in the Bitcoin trenches, it can be difficult and time-consuming to figure out who is doing good work.

        <p />But bitcoin developers <i>are</i> familiar with the technology. They <i>are</i> working in the trenches. Why not leverage their knowledge to help you pick someone?

        <p />Bitcoin Bootstrap does exactly this by allowing developers to vote on the other developers they think deserves funding. Each vote represents a developers cumulative knowledge on who is best working towards the desired goals and most deserving of financial help.

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
