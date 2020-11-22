import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

class BugReportPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.submit = this.submit.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000/api';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org/api';
    }
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  submit() {
    this.props.isUpdatingCallback(true);

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
      console.log("create_bug_report response: " + JSON.stringify(response));

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
      this.props.isUpdatingCallback(false);
    });
  }

  render() {
    console.log("---BugReportPage");

    return(
      <>
      <div className='mt-3'>
        <Card bg='light'>
          <Card.Body>
            <>
            <p>When reporting a bug, please include:</p>
            <ul>
              <li>The steps to reproduce the bug.</li>
              <li>The browser you are using.</li>
              <li>The operating system you are using.</li>
              <li>Optionally include your email address if it's ok to contact you for additional information.</li>
            </ul>
            </>
          </Card.Body>
        </Card>

        <Form className='mt-3'>
          <Form.Group controlId="description">
            <Form.Label>What is the problem? (500 characters max)</Form.Label>
            <Form.Control name="description" as="textarea" rows={3} maxLength="500" onChange={this.handleDescriptionChange} value={this.state.description} />
          </Form.Group>
          <Button disabled={this.props.isUpdating || this.state.description.length === 0} onClick={this.submit}>Submit</Button>
        </Form>
      </div>
      </>
    );
  }
}

export default BugReportPage;
