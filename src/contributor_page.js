import React from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Registration from './registration.js';
import CandidatesList from './candidates_list.js';

class ContributorPage extends React.Component {
  render() {
    return (
      <>
      <Tabs>
        <Tab eventKey="vote" title="Vote">
          <CandidatesList contributor={this.props.contributor} candidates={this.props.candidates} updateState={this.props.updateState} />
        </Tab>
        <Tab eventKey="register" title="Registration">
          <Registration contributor={this.props.contributor} updateState={this.props.updateState} />
        </Tab>
      </Tabs>
      </>
    );
  }
}

export default ContributorPage;
