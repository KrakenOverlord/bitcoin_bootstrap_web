import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function Introduction(props) {
  console.log("---Introduction");
  console.log(props.color);
  return (
    <Card className="mt-3" style={{backgroundColor: '#d9d9d9'}}>
      <Card.Body>
        So you want to give back to the Bitcoin community by helping to fund a Bitcoin developer?
        That's very generous and many are looking for help.

        <p />But which one? There are 1000
        <span>
          <a href='https://github.com/bitcoin/bitcoin/graphs/contributors'
            target="_blank"
            rel="noopener noreferrer"> contributors</a>
          {' '}to the
          {' '}<a href='https://github.com/bitcoin/bitcoin'
            target="_blank"
            rel="noopener noreferrer">Bitcoin repository</a>!
        </span>

        <p />Who is looking for help?

        <p />Who is doing good work?

        <p />Unless you’re already familiar with the technology and working in the trenches, it can be difficult to answer those questions.

        <p />But bitcoin developers <i>are</i> familiar with the technology.
        Bitcoin developers <i>are</i> working in the trenches.
        Bitcoin Bootstrap leverages their knowledge through a system of voting to bring visibility to the best contributors as rated by other contributors.
        Only contributors can register to be listed, and only contributors can vote.

        <p />See the list of candidates below.

        {props.numCandidates === 0 &&
          <p>
            No contributor has registered yet. Be the first!
            Just sign in, enter a brief description about the work you are doing and why you should receive funding and hit the register button and you will be listed.
          </p>
        }

        <p>
          <Button className="mt-3" href="#learn-more" variant="primary" onClick={() => props.showPage('learnMorePage')}>Learn more</Button>
        </p>
      </Card.Body>
    </Card>
  );
}

export default Introduction;
