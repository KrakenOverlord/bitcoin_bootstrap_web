import React from 'react';
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function print(message) {
  if (process.env.REACT_APP_DEVELOPMENT) {
    console.log(message);
  }
}

function CandidatesListRow(props) {
  print("---CandidatesListRow");

  const signedIn = props.contributor !== null;

  return (
    <Media as="li">
      { /* avatar and button */ }
      <div className="img-with-text">
        <a href={props.candidate.html_url} target="_blank" rel="noopener noreferrer">
          <img
            src={props.candidate.avatar_url}
            alt=""
            height="64"
            width="64" />
        </a>

        <br />
        {!signedIn && props.candidate.donation_url !== undefined &&
          <Button className="mt-1" variant="outline-primary" size="sm" target="_blank" rel="noopener noreferrer" href={props.candidate.donation_url}>Donate</Button>
        }
        {signedIn &&
          <div style={{ textAlign: "center" }}>
            <Button disabled={props.isUpdating} className="mt-1" variant="outline-primary" size="sm" onClick={() => props.vote(props.candidate.username)}>Vote</Button>
          </div>
        }
      </div>

      <Media.Body className="ml-3">
        <Row>
          <Col>
            { /* username */ }
            <a style={{ fontWeight: 'bold' }} href={props.candidate.html_url} target="_blank" rel="noopener noreferrer">{props.candidate.username}</a>
            <span style={{ textAlign: "center", fontWeight: 'bold', color: 'gray', fontSize: '12px' }}> - {props.candidate.votes} votes</span>
          </Col>

          { /* contributions */ }
          <Col className="mr-4" style={{ textAlign: "right", fontWeight: 'bold', color: 'gray', fontSize: '12px'}}>
            {props.candidate.contributions}{' contributions'}
          </Col>
        </Row>

        { /* description */ }
        <p>{props.candidate.description}</p>
      </Media.Body>
    </Media>
  );
}

export default CandidatesListRow;
