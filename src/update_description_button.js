import React from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function UpdateDescriptionButton(props) {
  return (
    <>
    {props.isUpdatingDescription ?
      <Button disabled={true} variant="primary">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {' '}Updating Description...
      </Button>
      :
      <Button onClick={props.updateDescription}>Update Description</Button>
    }
    </>
  );
}

export default UpdateDescriptionButton;
