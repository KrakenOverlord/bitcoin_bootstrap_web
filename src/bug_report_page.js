import React from 'react';
import Form from 'react-bootstrap/Form';
import SpinningButton from './utils/spinning_button.js';

class BugReportPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  submit() {
    this.setState({ description: '' });
    this.props.bugReport(this.props.contributor, this.state.description);
  }

  print(message) {
    if (process.env.REACT_APP_DEVELOPMENT) {
      console.log(message);
    }
  }

  render() {
    this.print("---BugReportPage");

    return(
      <>
      <div className='mt-3'>
        <Form className='mt-3'>
          <b>Bug Report</b>
          <Form.Group controlId="description">
            <Form.Label>Please include steps to reproduce the bug and the browser you are using.</Form.Label>
            <Form.Control name="description" as="textarea" rows={3} maxLength="1000" onChange={this.handleDescriptionChange} value={this.state.description} />
            <Form.Text className="text-muted">
              1000 characters max.
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
