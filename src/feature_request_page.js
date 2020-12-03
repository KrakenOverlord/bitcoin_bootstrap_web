import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SpinningButton from './utils/spinning_button.js';
import './app.css';

class FeatureRequestPage extends React.Component {
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
    this.props.isUpdatingCallback({ 'action' : 'requestingFeature'});

    // Get username if a contributor exists
    let username = null;
    if (this.props.contributor) {
      username = this.props.contributor.username;
    }

    this.print("Calling CreateFeatureRequest");
    axios.post(this.api_url, {
      command: 'CreateFeatureRequest',
      username: username,
      description: this.state.description
    })
    .then((res) => {
      var response = res.data;
      this.print("CreateFeatureRequest response: " + JSON.stringify(response));

      if (response.error) {
        this.props.showAlert({ variant: 'danger', message: "Could not record the feature request. Please try again later." });
      } else {
        this.props.showAlert({ variant: 'success', message: "Thanks for the feature request!" });
        this.setState({ description: '' });
      }
    })
    .catch((error) => {
      this.print(error);
      this.props.showAlert({ variant: 'danger', message: "Could not record the feature request. Please try again later." });
    })
    .then(() => {
      this.props.isUpdatingCallback(false);
    });
  }

  print(message) {
    if (process.env.REACT_APP_DEVELOPMENT) {
      console.log(message);
    }
  }

  render() {
    this.print("---FeatureRequestPage");

    return(
      <>
      <div className='mt-3'>
        <Form className='mt-3'>
          <b>Feature Request</b>
          <Form.Group controlId="description">
            <Form.Label>Please include a detailed description of how the feature should work.</Form.Label>
            <Form.Control name="description" as="textarea" rows={3} maxLength="500" onChange={this.handleDescriptionChange} value={this.state.description} />
            <Form.Text className="text-muted">
              500 characters max.
            </Form.Text>
          </Form.Group>

          <SpinningButton
            buttonText='Submit'
            actionButtonText='Submitting'
            action='requestingFeature'
            isUpdating={this.props.isUpdating}
            disabled={this.state.description.length === 0}
            onClick={this.submit} />
        </Form>
      </div>
      </>
    );
  }
}

export default FeatureRequestPage;
