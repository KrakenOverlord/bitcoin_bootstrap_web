import React from 'react';
import Table from 'react-bootstrap/Table'
import ContributorListRow from './contributor_list_row.js'

function MainScreen(props) {
  return (
    <Table responsive striped bordered hover size="sm">
      <thead>
      <tr>
        {props.user !== null &&
          <th>Vote</th>
        }
        <th>Votes</th>
        <th>Image</th>
        <th>Username</th>
        <th>Github Profile</th>
        <th>Contributions</th>
      </tr>
      </thead>
      <tbody>
        {props.contributors.map(contributor => (<ContributorListRow key={contributor.username} user={props.user} contributor={contributor} vote={props.vote} />))}
      </tbody>
    </Table>
  );
}

export default MainScreen;
