
import React from 'react';

function ContributorListRow(props) {
  return (
    <tr>
      <td>{
        <img
          src={props.contributor.avatar_url}
          alt=""
          height="25"
          width="25"
        />
      }</td>
      <td>{props.contributor.username}</td>
      <td> Github Profile</td>
      <td>{props.contributor.contributions}</td>
      <td></td>
    </tr>
  );
}

export default ContributorListRow;
