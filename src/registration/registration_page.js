import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ConfirmationModal from './confirmation_modal.js';
import SpinningButton from '../utils/spinning_button.js';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUnregisterModal: false,
      isCandidate: props.contributor.is_candidate,
      originalDescription: props.contributor.description,
      description: props.contributor.description
    };

    this.register = this.register.bind(this);
    this.unregisterConfirmed = this.unregisterConfirmed.bind(this);
    this.closeUnregisterModal = this.closeUnregisterModal.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.onSwitchAction = this.onSwitchAction.bind(this);

    this.api_url = process.env.REACT_APP_API_GATEWAY + "/api";
  }

  handleDescriptionChange(event) {
    if (event.target.value.indexOf('\n') > -1 || event.target.value.indexOf('  ') > -1) {
      return;
    }

    this.setState({
      description: event.target.value
    });
  }

  register() {
    this.props.isUpdatingCallback({ 'action' : 'registering'});

    this.print("Calling Register");
    axios.post(this.api_url, {
      command: "Register",
      access_token: this.props.contributor.access_token,
      description: this.state.description
    })
    .then((res) => {
      var response = res.data;
      this.print("register response: " + JSON.stringify(response));

      if (response.error === true) {
        this.handleError(response.error_code, "Could not register. Please try again later.");
      } else {
        let message = {
          variant: 'success',
          message: 'Registration was successful! You have been added to the candidates list.'
        };
        this.setState({
          isCandidate: true,
          originalDescription: response.contributor.description
        });
        this.props.updateState(response.contributor, response.candidates, message);
      }
    })
    .catch((error) => {
      this.print(error);
      this.handleError(100, "Could not register. Please try again later.");
    })
    .then(() => {
      this.props.isUpdatingCallback(null);
    });
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
        this.setState({isCandidate: false});
        this.props.updateState(response.contributor, response.candidates, message);
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
      description: this.state.description
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
    if (this.state.isCandidate) {
      this.setState({ showUnregisterModal: true });
    }
  }

  print(message) {
    if (process.env.REACT_APP_DEVELOPMENT) {
      console.log(message);
    }
  }

  render() {
    const isCandidate = this.state.isCandidate;
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
            <Form.Label>Please describe the contributions you have made, what you are currently working on, and how people can fund you.</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={4}
              maxLength="500"
              onChange={this.handleDescriptionChange}
              value={this.state.description} />
              <Form.Text className="text-muted">
                500 characters max. Extra whitespace and newlines are stripped out. Descriptions are collapsed down to a single continuous paragraph when displayed in the candidates list.
              </Form.Text>
              {isCandidate &&
                <SpinningButton
                  disabled={this.state.isUpdating || (this.state.description === this.state.originalDescription)}
                  buttonText='Update Description'
                  actionButtonText='Updating Description...'
                  action='updatingDescription'
                  isUpdating={this.props.isUpdating}
                  onClick={this.updateDescription} />
              }
          </Form.Group>

          {isCandidate ?
            <div className='mt-5'>
            <b>Registration</b>
            <br />
            <span style={{ fontSize: '12px'}}>Unregister to be removed from the candidates list.
            You can re-register at any time and your votes and description are restored.
            You will lose any votes that are changed while you are unregistered.
            </span>
            <Form.Check
              type="switch"
              id="custom-switch"
              label='Registered'
              checked={this.state.isCandidate}
              onChange={this.onSwitchAction}
            />
            </div>
            :
            <Form.Group controlId="description" className="mt-3">
              <Form.Label></Form.Label>
              <SpinningButton
                buttonText='Register'
                actionButtonText='Registering...'
                action='registering'
                isUpdating={this.props.isUpdating}
                onClick={this.register} />
            </Form.Group>
          }
        </Form>
      </div>
      </>
    );
  }
}

export default RegistrationPage;
