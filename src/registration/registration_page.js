import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import ConfirmationModal from './confirmation_modal.js';
import RegistrationCard from './registration_card.js';
import SpinningButton from '../utils/spinning_button.js';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUnregisterModal: false,
      description: this.props.contributor.description
    };

    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
    this.unregisterConfirmed = this.unregisterConfirmed.bind(this);
    this.closeUnregisterModal = this.closeUnregisterModal.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    this.api_url = process.env.REACT_APP_API_GATEWAY + "/api";
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  register() {
    this.props.isUpdatingCallback({ 'action' : 'registering'});

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
      this.props.isUpdatingCallback(null);
    });
  }

  unregisterConfirmed() {
    console.log("Calling Unregister");
    axios.post(this.api_url, {
      command: "Unregister",
      access_token: this.props.contributor.access_token
    })
    .then((res) => {
      var response = res.data;
      console.log("Unregister response: " + JSON.stringify(response));

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

  updateDescription() {
    this.props.isUpdatingCallback({ 'action' : 'updatingDescription' });

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
      this.props.isUpdatingCallback(null);
    });
  }

  handleError(code, message) {
    if (code === 0 || code === 1) {
      this.props.signOut();
    } else {
      this.props.showAlert({ variant: 'danger', message: message });
    }
  }

  unregister() {
    this.setState({ showUnregisterModal: true });
  }

  closeUnregisterModal() {
    this.setState({ showUnregisterModal: false });
  }

  render() {
    const is_candidate = this.props.contributor.is_candidate;
    console.log("---RegistrationPage");
    return(
      <>
      { /* show unregister modal? */ }
      {this.state.showUnregisterModal &&
        <ConfirmationModal
          confirm={this.unregisterConfirmed}
          cancel={this.closeUnregisterModal} />
      }

      <div className='mt-3'>
        <RegistrationCard is_candidate={is_candidate} />

        <Form className='mt-3'>
          { /* description */ }
          <Form.Group controlId="description">
            <Form.Label>Why should you receive funding? (500 characters max)</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={4}
              maxLength="500"
              onChange={this.handleDescriptionChange}
              value={this.state.description} />
          </Form.Group>

          {is_candidate ?
            <>
            <SpinningButton
              buttonText='Update Description'
              actionButtonText='Updating Description...'
              action='updatingDescription'
              isUpdating={this.props.isUpdating}
              disabled={this.state.description.length === 0}
              onClick={this.updateDescription} />
            <Button
              disabled={this.state.isUpdating}
              className="ml-2"
              onClick={this.unregister}>
              Unregister
            </Button>
            </>
            :
            <SpinningButton
              buttonText='Register'
              actionButtonText='Registering...'
              action='registering'
              isUpdating={this.props.isUpdating}
              onClick={this.register} />
          }
        </Form>
      </div>
      </>
    );
  }
}

export default RegistrationPage;
