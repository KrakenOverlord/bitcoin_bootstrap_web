import React from 'react';
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UsernameButton from './username_button.js'

function CandidatesListRow(props) {
  console.log("---CandidatesListRow");

  return (
    <Media as="li">
      <div className="img-with-text">
        {props.candidate.avatar_url !== '' ?
          <a href={props.candidate.html_url} target="_blank" rel="noopener noreferrer">
            <img
              src={props.candidate.avatar_url}
              alt=""
              height="64"
              width="64" />
          </a>
          :
          <img
            src='anon-contributor.png'
            alt=""
            height="64"
            width="64" />
        }

        <p className="mt-2" style={{ textAlign: "center", fontWeight: 'bold', color: 'gray', fontSize: '12px' }}>{props.candidate.votes}{' votes'}</p>
      </div>

      <Media.Body className="ml-3">
        <Row>
          <Col>
            <UsernameButton
              contributor={props.contributor}
              candidate={props.candidate}
              updateState={props.updateState}
              signOut={props.signOut}
              showAlert={props.showAlert}
              isUpdating={props.isUpdating}
              isUpdatingCallback={props.isUpdatingCallback} />
          </Col>
          <Col className="mr-4" style={{ textAlign: "right", fontWeight: 'bold', color: 'gray', fontSize: '12px'}}>
            {props.candidate.contributions}{' contributions'}
          </Col>
        </Row>

          <p>{props.candidate.description}</p>
      </Media.Body>
    </Media>
  );
}

export default CandidatesListRow;
