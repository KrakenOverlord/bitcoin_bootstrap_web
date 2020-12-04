import React from 'react';
import CandidatesListRow from './candidates_list_row.js'

function print(message) {
  if (process.env.REACT_APP_DEVELOPMENT) {
    console.log(message);
  }
}

function CandidatesList(props) {
  print("---CandidatesList");

  return (
    <ul className="list-unstyled mt-4">
      {props.candidates.map(candidate => (<CandidatesListRow
                                            key={candidate.username}
                                            contributor={props.contributor}
                                            candidate={candidate}
                                            updateState={props.updateState}
                                            signOut={props.signOut}
                                            showAlert={props.showAlert}
                                            isUpdating={props.isUpdating}
                                            isUpdatingCallback={props.isUpdatingCallback} />))}
    </ul>
  );
}

export default CandidatesList;
