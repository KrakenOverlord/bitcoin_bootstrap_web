import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SpinningButton from './utils/spinning_button.js';

class BugReportPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.submit = this.submit.bind(this);

    this.api_url = process.env.REACT_APP_API_GATEWAY + "/api";
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  submit() {
    this.props.isUpdatingCallback({ 'action' : 'reportingBug'});

    // Get username if a contributor exists
    let username = null;
    if (this.props.contributor) {
      username = this.props.contributor.username;
    }

    console.log("Calling CreateBugReport");
    axios.post(this.api_url, {
      command: 'CreateBugReport',
      username: username,
      description: this.state.description
    })
    .then((res) => {
      var response = res.data;
      console.log("CreateBugReport response: " + JSON.stringify(response));

      if (response.error) {
        this.props.showAlert({ variant: 'danger', message: "Could not record the bug report. Please try again later." });
      } else {
        this.props.showAlert({ variant: 'success', message: "Thanks for the bug report!" });
        this.setState({ description: '' });
      }
    })
    .catch((error) => {
      console.log(error);
      this.props.showAlert({ variant: 'danger', message: "Could not record the bug report. Please try again later." });
    })
    .then(() => {
      this.props.isUpdatingCallback(null);
    });
  }

  render() {
    console.log("---BugReportPage");

    return(
      <>
      <div className='mt-3'>
        <Form className='mt-3'>
          <b>Bug Report</b>
          <Form.Group controlId="description">
            <Form.Label>Please include steps to reproduce the bug and the browser you are using.</Form.Label>
            <Form.Control name="description" as="textarea" rows={3} maxLength="500" onChange={this.handleDescriptionChange} value={this.state.description} />
            <Form.Text className="text-muted">
              500 characters max.
            </Form.Text>
          </Form.Group>

          <SpinningButton
            buttonText='Submit'
            actionButtonText='Submitting'
            action='reportingBug'
            isUpdating={this.props.isUpdating}
            disabled={this.state.description.length === 0}
            onClick={this.submit} />
        </Form>
      </div>
      </>
    );
  }
}

export default BugReportPage;
