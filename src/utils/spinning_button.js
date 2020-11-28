import React from 'react';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function SpinningButton(props) {
  return (
    <>
    {!props.isUpdating && <Button disabled={props.disabled} onClick={props.onClick}>{props.buttonText}</Button>}

    {props.isUpdating && props.isUpdating.action !== props.action && <Button disabled={true}>{props.buttonText}</Button>}

    {props.isUpdating && props.isUpdating.action === props.action &&
      <Button disabled={true}>
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
