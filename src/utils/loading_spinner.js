import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

function print(message) {
  if (process.env.REACT_APP_DEVELOPMENT) {
    console.log(message);
  }
}

function LoadingSpinner(props) {
  print("---LoadingSpinner");

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  return (
    <div className="text-center" style={style}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
