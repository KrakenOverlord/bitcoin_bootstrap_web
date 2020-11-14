import React from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Voting from './voting.js';
import Registration from './registration.js';

class ContributorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      voting: false,
      voting_for: ''
    };

    this.isVotingCallback = this.isVotingCallback.bind(this);
  }

  isVotingCallback(state, voting_for) {
    this.setState({
      voting: state,
      voting_for: voting_for
    });
  }

  render() {
    return (
      <Tabs className="mt-3">
        <Tab eventKey="vote" title="Vote">
          <Voting
            contributor={this.props.contributor}
            candidates={this.props.candidates}
            updateState={this.props.updateState}
            voting={this.state.voting}
            voting_for={this.state.voting_for}
            isVotingCallback={this.isVotingCallback} />
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
