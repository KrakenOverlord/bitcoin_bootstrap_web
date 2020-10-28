import React from 'react';
import Table from 'react-bootstrap/Table'
import ContributorListRow from './contributor_list_row.js'

function MainScreen(props) {
  return (
    <Table responsive striped bordered hover size="sm">
      <thead>
      <tr>
        <th>Image</th>
        <th>Username</th>
        <th>Github Profile</th>
        <th>Contributions</th>
      </tr>
      </thead>
      <tbody>
        {props.contributors.map(contributor => (<ContributorListRow key={contributor.username} contributor={contributor} />))}
      </tbody>
    </Table>
  );
}

export default MainScreen;
