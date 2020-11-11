import React from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertMessage(props) {
  return (
    <Alert className="mt-3" variant={props.alert.variant} onClose={props.deleteAlert} dismissible>
      {props.alert.message}
    </Alert>
  );
}

export default AlertMessage;
