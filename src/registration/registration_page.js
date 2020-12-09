import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import ConfirmationModal from './confirmation_modal.js';
import SpinningButton from '../utils/spinning_button.js';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUnregisterModal: false
    };

    this.updateDonationUrl = this.updateDonationUrl.bind(this);
    this.unregister = this.unregister.bind(this);
    this.closeUnregisterModal = this.closeUnregisterModal.bind(this);
    this.onSwitchAction = this.onSwitchAction.bind(this);
  }

  onSwitchAction() {
    this.setState({ showUnregisterModal: true });
  }

  closeUnregisterModal() {
    this.setState({ showUnregisterModal: false });
  }

  print(message) {
    if (process.env.REACT_APP_DEVELOPMENT) {
      console.log(message);
    }
  }

  updateDonationUrl() {
    if (this.props.donationUrl !== '') {
      let url;

      try {
        url = new URL(this.props.donationUrl);
      } catch (_) {
        alert("Please enter a valid donation URL.");
        return;
      }

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        alert("Please enter a valid donation URL.");
        return;
      }
    }

    this.props.updateDonationUrl();
  }

  unregister() {
    if (this.props.donationUrl !== '') {
      let url;

      try {
        url = new URL(this.props.donationUrl);
      } catch (_) {
        alert("Please enter a valid donation URL.");
        return;
      }

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        alert("Please enter a valid donation URL.");
        return;
      }
    }

    this.props.unregister();
  }

  render() {
    this.print("---RegistrationPage");

    return(
      <>
      { /* show unregister modal? */ }
      {this.state.showUnregisterModal &&
        <ConfirmationModal
          confirm={this.unregister}
          cancel={this.closeUnregisterModal} />
      }

      <div className='mt-3'>
        <Form className='mt-3'>

          { /* description */ }
          <b>Description</b>
          <Form.Group controlId="description">
            <Form.Text className="text-muted">Please describe the contributions you have made and what you are currently working on.</Form.Text>
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
              onClick={this.props.updateDescription} />
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
