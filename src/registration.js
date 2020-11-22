import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import ConfirmationModal from './confirmation_modal.js';
import RegisterButton from './register_button.js';
import UpdateDescriptionButton from './update_description_button.js';

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistering: false,
      isUpdatingDescription: false,
      showUnregisterModal: false,
      description: this.props.contributor.description
    };

    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
    this.unregisterConfirmed = this.unregisterConfirmed.bind(this);
    this.closeUnregisterModal = this.closeUnregisterModal.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

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

  register() {
    this.setState({ isRegistering: true });

    console.log("Calling Register");
    axios.post(this.api_url, {
      command: "Register",
      access_token: this.props.contributor.access_token,
      description: this.state.description
    })
    .then((res) => {
      var response = res.data;
      console.log("register response: " + JSON.stringify(response));

      if (response.error === true) {
        this.handleError(response.error_code, "Could not register. Please try again later.");
      } else {
        let message = {
          variant: 'success',
          message: 'You have successfully registered.'
        };
        this.props.updateState(response.contributor, response.candidates, message);
      }
    })
    .catch((error) => {
      console.log(error);
      this.handleError(100, "Could not register. Please try again later.");
    })
    .then(() => {
      this.setState({ isRegistering: false });
    });
  }

  unregister() {
    this.setState({ showUnregisterModal: true });
  }

  unregisterConfirmed() {
    console.log("Calling Unregister");
    axios.post(this.api_url, {
      command: "Unregister",
      access_token: this.props.contributor.access_token
    })
    .then((res) => {
      var response = res.data;
      console.log("unregister response: " + JSON.stringify(response));

      if (response.error) {
        this.handleError(response.error_code, "Could not unregister. Please try again later.");
      } else {
        this.setState({ description: '' });
        let message = {
          variant: 'success',
          message: 'You successfully unregistered.'
        };
        this.props.updateState(response.contributor, response.candidates, message);
      }
    })
    .catch((error) => {
      console.log(error);
      this.handleError(100, "Could not unregister. Please try again later.");
    })
    .then(() => {
      this.closeUnregisterModal();
    });
  }

  closeUnregisterModal() {
    this.setState({ showUnregisterModal: false });
  }

  updateDescription() {
    this.setState({ isUpdatingDescription: true });

    console.log("Calling UpdateDescription");
    axios.post(this.api_url, {
      command: "UpdateDescription",
      access_token: this.props.contributor.access_token,
      description: this.state.description
    })
    .then((res) => {
      var response = res.data;
      console.log("update_description response: " + JSON.stringify(response));

      if (response.error) {
        this.handleError(response.error_code, "Could not update description. Please try again later.");
      } else {
        this.props.updateState(response.contributor, response.candidates, { variant: 'success', message: 'You have successfully updated your description.' });
      }
    })
    .catch((error) => {
      console.log(error);
      this.handleError(100, "Could not update description. Please try again later.");
    })
    .then(() => {
      this.setState({ isUpdatingDescription: false });
    });
  }

  handleError(code, message) {
    if (code === 0 || code === 1) {
      this.props.signOut();
    } else {
      this.props.showAlert({ variant: 'danger', message: message });
    }
  }

  render() {
    console.log("---Registration");
    return(
      <>
      {this.state.showUnregisterModal === true &&
        <ConfirmationModal confirm={this.unregisterConfirmed} cancel={this.closeUnregisterModal} />
      }

      <div className='mt-3'>
        {this.props.contributor.is_candidate === false &&
          <Card bg='light'>
            <Card.Body>
              <>
              Please describe the contributions you have made and what you are currently working on.
              <p>
              Don't forget to include information on how people can get money to you either in the description below or on your GitHub profile page.
              </p>
              </>
            </Card.Body>
          </Card>
        }
        {this.props.contributor.is_candidate === true &&
          <Card bg='light'>
            <Card.Body>
              <>
              <span>You are registered as a candidate.</span>
              </>
            </Card.Body>
          </Card>
        }

        <Form className='mt-3'>
          <Form.Group controlId="description">
            <Form.Label>Why should you receive funding? (500 characters max)</Form.Label>
            <Form.Control name="description" as="textarea" rows={4} maxLength="500" onChange={this.handleDescriptionChange} value={this.state.description} />
          </Form.Group>
          {!this.props.contributor.is_candidate &&
            <RegisterButton
              register={this.register}
              isRegistering={this.state.isRegistering} />
          }
          {this.props.contributor.is_candidate &&
            <>
            <UpdateDescriptionButton
              disabled={this.state.description.length === 0}
              isUpdatingDescription={this.state.isUpdatingDescription}
              updateDescription={this.updateDescription} />
            <Button disabled={this.state.isUpdatingDescription} className="ml-2" onClick={this.unregister}>Unregister</Button>
            </>
          }
        </Form>
      </div>
      </>
    );
  }
}

export default Registration;
