import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import ConfirmationModal from './confirmation_modal.js';
import SpinningButton from '../utils/spinning_button.js';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUnregisterModal: false
    };

    this.updateDescription = this.updateDescription.bind(this);
    this.updateDonationUrl = this.updateDonationUrl.bind(this);
    this.unregisterConfirmed = this.unregisterConfirmed.bind(this);
    this.closeUnregisterModal = this.closeUnregisterModal.bind(this);
    this.onSwitchAction = this.onSwitchAction.bind(this);

    this.api_url = process.env.REACT_APP_API_GATEWAY + "/api";
  }

  unregisterConfirmed() {
    this.print("Calling Unregister");
    axios.post(this.api_url, {
      command: "Unregister",
      access_token: this.props.contributor.access_token
    })
    .then((res) => {
      var response = res.data;
      this.print("Unregister response: " + JSON.stringify(response));

      if (response.error) {
        this.handleError(response.error_code, "Could not unregister. Please try again later.");
      } else {
        let message = {
          variant: 'success',
          message: 'You successfully unregistered and removed from the candidates list.'
        };
        this.props.updateState(response.contributor, response.candidates, message);
        this.props.showPage("homePage");
      }
    })
    .catch((error) => {
      this.print(error);
      this.handleError(100, "Could not unregister. Please try again later.");
    })
    .then(() => {
      this.closeUnregisterModal();
    });
  }

  updateDescription() {
    this.props.isUpdatingCallback({ 'action' : 'updatingDescription' });

    this.print("Calling UpdateDescription");
    axios.post(this.api_url, {
      command: "UpdateDescription",
      access_token: this.props.contributor.access_token,
      description: this.props.description
    })
    .then((res) => {
      var response = res.data;
      this.print("UpdateDescription response: " + JSON.stringify(response));

      if (response.error) {
        this.handleError(response.error_code, "Could not update description. Please try again later.");
      } else {
        this.setState({originalDescription: response.contributor.description});
        this.props.updateState(response.contributor, response.candidates, { variant: 'success', message: 'You have successfully updated your description.' });
      }
    })
    .catch((error) => {
      this.print(error);
      this.handleError(100, "Could not update description. Please try again later.");
    })
    .then(() => {
      this.props.isUpdatingCallback(null);
    });
  }

  updateDonationUrl() {
    if (this.isValidDonationUrl() !== true) {
      alert("The donation URL must be a valid.");
      return;
    }

    this.props.isUpdatingCallback({ 'action' : 'updatingDonationUrl' });

    this.print("Calling UpdateDonationUrl");
    axios.post(this.api_url, {
      command: "UpdateDonationUrl",
      access_token: this.props.contributor.access_token,
      donation_url: this.props.donationUrl
    })
    .then((res) => {
      var response = res.data;
      this.print("UpdateDonationUrl response: " + JSON.stringify(response));

      if (response.error) {
        this.handleError(response.error_code, "Could not update donation URL. Please try again later.");
      } else {
        this.props.updateState(response.contributor, response.candidates, { variant: 'success', message: 'You have successfully updated your donation URL.' });
      }
    })
    .catch((error) => {
      this.print(error);
      this.handleError(100, "Could not update donation URL. Please try again later.");
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

  closeUnregisterModal() {
    this.setState({ showUnregisterModal: false });
  }

  onSwitchAction() {
    this.setState({ showUnregisterModal: true });
  }

  print(message) {
    if (process.env.REACT_APP_DEVELOPMENT) {
      console.log(message);
    }
  }

  isValidDonationUrl() {
    if (this.props.donationUrl === '') {
      return true;
    }

    let url;

    try {
      url = new URL(this.props.donationUrl);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  render() {
    this.print("---RegistrationPage");

    return(
      <>
      { /* show unregister modal? */ }
      {this.state.showUnregisterModal &&
        <ConfirmationModal
          confirm={this.unregisterConfirmed}
          cancel={this.closeUnregisterModal} />
      }

      <div className='mt-3'>
        <Form className='mt-3'>

          { /* description */ }
          <b>Description</b>
          <Form.Group controlId="description">
            <Form.Text className="text-muted">Please describe the contributions you have made, what you are currently working on, and how people can fund you.</Form.Text>
            <Form.Control
              name="description"
              as="textarea"
              rows={4}
              maxLength="750"
              onChange={this.props.handleDescriptionChange}
              value={this.props.description} />
            <Form.Text className="text-muted">
              750 characters max. Newlines are stripped out and descriptions are collapsed down to a single continuous paragraph when displayed in the candidates list.
            </Form.Text>

            <Form.Group controlId="description" className="mt-2">
            <SpinningButton
              disabled={this.state.isUpdating || (this.props.description === this.props.originalDescription)}
              buttonText='Update Description'
              actionButtonText='Updating Description...'
              action='updatingDescription'
              isUpdating={this.props.isUpdating}
              onClick={this.updateDescription} />
            </Form.Group>
          </Form.Group>

          { /* donation button */ }
          <b>Donation Button URL</b>
          <Form.Group controlId="donation">
            <Form.Text className="text-muted">
              Specify a valid URL to display a donation button linked to the URL. For example https://github.com/sponsors/{this.props.contributor.username}
            </Form.Text>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                maxLength="100"
                onChange={this.props.handleDonationUrlChange}
                value={this.props.donationUrl}
              />
            </InputGroup>

            <Form.Group controlId="donation" className="mt-2">
            <SpinningButton
              disabled={this.props.isUpdating || (this.props.donationUrl === this.props.originalDonationUrl)}
              buttonText='Update Donation Button URL'
              actionButtonText='Updating Donation Button URL...'
              action='updatingDonationUrl'
              isUpdating={this.props.isUpdating}
              onClick={this.updateDonationUrl} />
            </Form.Group>
          </Form.Group>

          <div className='mt-4'>
          <b>Registration</b>
          <br />
          <Form.Text className="text-muted">Unregister to be removed from the candidates list.
          You can re-register at any time and your votes and description are restored.
          You will only lose votes if contributors vote for someone else while you are unregistered.
          </Form.Text>
          <Form.Check
            type="switch"
            id="custom-switch"
            label='Registered'
            checked={true}
            onChange={this.onSwitchAction}
          />
          </div>
        </Form>
      </div>
      </>
    );
  }
}

export default RegistrationPage;
