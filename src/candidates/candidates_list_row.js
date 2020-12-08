import React from 'react';
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

function print(message) {
  if (process.env.REACT_APP_DEVELOPMENT) {
    console.log(message);
  }
}

function CandidatesListRow(props) {
  print("---CandidatesListRow");

  const signedIn = props.contributor !== null;
  const donationUrl = props.candidate.donation_url;
  const isUpdating = props.isUpdating;
  const candidateUsername = props.candidate.username;
  let voted_for = null
  if (signedIn) {
    voted_for = props.contributor.voted_for;
  }

  return (
    <Media as="li">
      <div className="img-with-text">
        { /* avatar */ }
        <a href={props.candidate.html_url} target="_blank" rel="noopener noreferrer">
          <img
            src={props.candidate.avatar_url}
            alt=""
            height="64"
            width="64" />
        </a>

        <br />
        { /* not signed in */ }
        {!signedIn && donationUrl !== '' &&
          <Button className="mt-1" variant="primary" size="sm" target="_blank" rel="noopener noreferrer" href={props.candidate.donation_url}>Donate</Button>
        }

        { /* signed in and not updating and didn't vote for this candidate*/ }
        {signedIn && !isUpdating && voted_for !== candidateUsername &&
          <div style={{ textAlign: "center" }}>
            <Button className="mt-1" variant="primary" size="sm" onClick={() => props.vote(props.candidate.username)}>Vote</Button>
          </div>
        }

        { /* signed in and not updating and voted for this candidate*/ }
        {signedIn && !isUpdating && voted_for === candidateUsername &&
          <div style={{ textAlign: "center" }}>
            <img className="mt-1" src={'vote.png'} alt="" height="30" width="30" />
          </div>
        }

        { /* signed in and updating */ }
        {signedIn && isUpdating && isUpdating.action === 'voting' && isUpdating.candidateUsername === candidateUsername &&
          <div style={{ textAlign: "center" }}>
          <Button size="sm" variant='primary' disabled={true}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true" />
          </Button>
          </div>
        }

        {signedIn && isUpdating && (isUpdating.action !== 'voting' || isUpdating.candidateUsername !== candidateUsername) &&
          <div style={{ textAlign: "center" }}>
            <Button disabled={true} className="mt-1" variant="primary" size="sm">Vote</Button>
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
