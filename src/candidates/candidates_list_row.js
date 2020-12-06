import React from 'react';
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UsernameButton from './username_button.js'

function print(message) {
  if (process.env.REACT_APP_DEVELOPMENT) {
    console.log(message);
  }
}

function CandidatesListRow(props) {
  print("---CandidatesListRow");

  return (
    <Media as="li">

      { /* avatar and votes */ }
      <div className="img-with-text">
        <a href={props.candidate.html_url} target="_blank" rel="noopener noreferrer">
          <img
            src={props.candidate.avatar_url}
            alt=""
            height="64"
            width="64" />
        </a>
        <p className="mt-2" style={{ textAlign: "center", fontWeight: 'bold', color: 'gray', fontSize: '12px' }}>{props.candidate.votes}{' votes'}</p>
      </div>

      <Media.Body className="ml-3">
        <Row>
          <Col>
            { /* username */ }
            <UsernameButton
              contributor={props.contributor}
              candidate={props.candidate}
              updateState={props.updateState}
              signOut={props.signOut}
              showAlert={props.showAlert}
              isUpdating={props.isUpdating}
              isUpdatingCallback={props.isUpdatingCallback} />
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
