import React from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function SpinningButton(props) {
  return (
    <>
    {!props.isUpdating && <Button variant='primary' size="sm" disabled={props.disabled} onClick={props.onClick}>{props.buttonText}</Button>}

    {props.isUpdating && props.isUpdating.action !== props.action && <Button variant='primary' size="sm" disabled={true}>{props.buttonText}</Button>}

    {props.isUpdating && props.isUpdating.action === props.action &&
      <Button size="sm" variant='primary' disabled={true}>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true" />
        {' ' + props.actionButtonText}
      </Button>
    }
    </>
  );
}

export default SpinningButton;
