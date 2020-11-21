import React from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Voting from './voting.js';
import Registration from './registration.js';

class ContributorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVoting: null
    };

    this.isVotingCallback = this.isVotingCallback.bind(this);
  }

  isVotingCallback(isVoting) {
    this.setState({
      isVoting: isVoting
    });
  }

  render() {
    console.log("---ContributorPage");

    return (
      <Tabs className="mt-3">
        <Tab eventKey="voting" title="Voting">
          <Voting
            contributor={this.props.contributor}
            candidates={this.props.candidates}
            updateState={this.props.updateState}
            signOut={this.props.signOut}
            showAlert={this.props.showAlert}
            isVoting={this.state.isVoting}
            isVotingCallback={this.isVotingCallback} />
        </Tab>
        <Tab eventKey="registration" title="Registration">
          <Registration
            contributor={this.props.contributor}
            updateState={this.props.updateState}
            signOut={this.props.signOut}
            showAlert={this.props.showAlert} />
        </Tab>
      </Tabs>
    );
  }
}

export default ContributorPage;
