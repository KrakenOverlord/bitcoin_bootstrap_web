import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SpinningButton from './utils/spinning_button.js';

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

    console.log("Calling CreateFeatureRequest");
    axios.post(this.api_url, {
      command: 'CreateFeatureRequest',
      username: username,
      description: this.state.description
    })
    .then((res) => {
      var response = res.data;
      console.log("CreateFeatureRequest response: " + JSON.stringify(response));

      if (response.error) {
        this.props.showAlert({ variant: 'danger', message: "Could not record the feature request. Please try again later." });
      } else {
        this.props.showAlert({ variant: 'success', message: "Thanks for the feature request!" });
        this.setState({ description: '' });
      }
    })
    .catch((error) => {
      console.log(error);
      this.props.showAlert({ variant: 'danger', message: "Could not record the feature request. Please try again later." });
    })
    .then(() => {
      this.props.isUpdatingCallback(false);
    });
  }

  render() {
    console.log("---FeatureRequestPage");

    return(
      <>
      <div className='mt-3'>
        <Card bg='light'>
          <Card.Body>
            <>
            <p>When requesting a feature, please include a detailed description of how it should work.</p>
            </>
          </Card.Body>
        </Card>

        <Form className='mt-3'>
          <Form.Group controlId="description">
            <Form.Label>What is your idea? (500 characters max)</Form.Label>
            <Form.Control name="description" as="textarea" rows={3} maxLength="500" onChange={this.handleDescriptionChange} value={this.state.description} />
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
