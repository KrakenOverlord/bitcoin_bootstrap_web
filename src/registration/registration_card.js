import React from 'react';
import Card from 'react-bootstrap/Card';

function RegistrationCard(props) {
  return (
    <Card style={{backgroundColor:'#f2dabd'}}>
      <Card.Body>
        {props.is_candidate ?
          <span>You are registered as a candidate. </span>
          :
          <>
            Please describe the contributions you have made and what you are currently working on.
            <p>
            Don't forget to include information on how people can get money to you either in the description below or on your GitHub profile page.
            </p>
          </>
        }
      </Card.Body>
    </Card>
  );
}

export default RegistrationCard;
