import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

function LoadingSpinner(props) {
  console.log("---LoadingSpinner");

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
