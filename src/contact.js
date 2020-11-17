import React from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import BugReport from './bug_report.js';
import FeatureRequest from './feature_request.js';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: null
    };

    this.isUpdatingCallback = this.isUpdatingCallback.bind(this);
  }

  isUpdatingCallback(isUpdating) {
    this.setState({
      isUpdating: isUpdating
    });
  }

  render() {
    console.log("---Contact");

    return(
      <Tabs className="mt-3">
        <Tab eventKey="bugReport" title="Bug Report">
          <BugReport
            contributor={this.props.contributor}
            showAlert={this.props.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        </Tab>
        <Tab eventKey="featureRequest" title="Feature Request">
          <FeatureRequest
            contributor={this.props.contributor}
            showAlert={this.props.showAlert}
            isUpdating={this.state.isUpdating}
            isUpdatingCallback={this.isUpdatingCallback} />
        </Tab>
      </Tabs>
    );
  }
}

export default Contact;
