import React from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function UpdateDescriptionButton(props) {
  return (
    <>
    {!props.isUpdating && <Button disabled={props.disabled} onClick={props.updateDescription}>Update Description</Button>}

    {props.isUpdating && props.isUpdating.action !== 'updatingDescription' && <Button disabled={true}>Update Description</Button>}

    {props.isUpdating && props.isUpdating.action === 'updatingDescription' &&
      <Button disabled={true}>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true" />
        {' '}Updating Description...
      </Button>
    }
    </>
  );
}

export default UpdateDescriptionButton;
