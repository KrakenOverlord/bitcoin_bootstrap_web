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
      A curated list of Bitcoin developers seeking financial help.
      </p>
      <b></b>
        <p />Many people want to give back to the Bitcoin community by helping to fund a Bitcoin developer.
        It's a very generous thing to do, and many developers are looking for help.

        <p />But which developer? There are over 750
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
        Bitcoin Bootstrap leverages their knowledge using a voting system to bring visibility to the best developers as ranked by other developers.
        <p />To ensure a high-quality candidate list, only developers who have made contributions to the Bitcoin repository can register to be listed as candidates looking for help, and only developers who have made contributions to the Bitcoin repository can vote on those candidates.

        <p />See the list of candidates below.

        <p>
          <Button className="mt-3" href="#learn-more" variant="primary" onClick={() => props.showPage('learnMorePage')}>Learn more</Button>
        </p>
      </Card.Body>
    </Card>
  );
}

export default Introduction;
