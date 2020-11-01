
import React from 'react';
import Button from 'react-bootstrap/Button'

function ContributorListRow(props) {
  return (
    <tr>
      {props.user !== null &&
        <Button size="sm" disabled={props.user.voted_for === props.contributor.username} onClick={() => props.vote(props.contributor.username)}>Vote</Button>
      }
      <td>{props.contributor.votes}</td>
      <td>{
        <img
          src={props.contributor.avatar_url}
          alt=""
          height="25"
          width="25"
        />
      }</td>
      <td>{props.contributor.username}</td>
      <td> {props.contributor.html_url}</td>
      <td>{props.contributor.contributions}</td>
      <td></td>
    </tr>
  );
}

export default ContributorListRow;
