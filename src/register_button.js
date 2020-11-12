import React from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function RegisterButton(props) {
  return (
    <>
    {props.isRegistering ?
      <Button disabled={true} variant="primary">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {' '}Registering...
      </Button>
      :
      <Button variant="primary" onClick={props.register}>Register</Button>
    }
    </>
  );
}

export default RegisterButton;
