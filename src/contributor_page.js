import React from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Voting from './voting.js';
import Registration from './registration.js';

class ContributorPage extends React.Component {
  render() {
    return (
      <Tabs>
        <Tab eventKey="vote" title="Vote">
          <Voting
            contributor={this.props.contributor}
            candidates={this.props.candidates}
            updateState={this.props.updateState}
            voting={this.props.voting}
            isVotingCallback={this.props.isVotingCallback} />
        </Tab>
        <Tab eventKey="registration" title="Registration">
          <Registration
            contributor={this.props.contributor}
            updateState={this.props.updateState} />
        </Tab>
      </Tabs>
    );
  }
}

export default ContributorPage;
