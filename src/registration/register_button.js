import React from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function RegisterButton(props) {
  return (
    <>
    {!props.isUpdating && <Button onClick={props.register}>Register</Button>}

    {props.isUpdating && props.isUpdating.action !== 'registering' && <Button disabled={true}>Register</Button>}

    {props.isUpdating && props.isUpdating.action === 'registering' &&
      <Button disabled={true}>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {' '}Registering...
      </Button>
    }
    </>
  );
}

export default RegisterButton;
