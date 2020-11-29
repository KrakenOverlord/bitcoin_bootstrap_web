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
      isCandidate: true,
      originalDescription: props.contributor.description,
      description: props.contributor.description
    };

    this.register = this.register.bind(this);
    this.update = this.update.bind(this);
    this.unregisterConfirmed = this.unregisterConfirmed.bind(this);
    this.closeUnregisterModal = this.closeUnregisterModal.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.onSwitchAction = this.onSwitchAction.bind(this);

    this.api_url = process.env.REACT_APP_API_GATEWAY + "/api";
  }

  // static getDerivedStateFromProps(props, state) {
  //   return ({
  //     switchOn: props.contributor.isCandidate,
  //     original_description: props.contributor.description,
  //     description: props.contributor.description
  //   });
  // }

  // componentDidMount() {
  //   this.setState({
  //     switchOn: this.props.contributor.isCandidate,
  //     original_description: this.props.contributor.description,
  //     description: this.props.contributor.description
  //   });
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.isCandidate !== this.state.isCandidate) {
  //     this.setState({
  //       switchOn: this.props.contributor.isCandidate,
  //       original_description: this.props.contributor.description,
  //       description: this.props.contributor.description
  //     });
  //   }
  // }

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
          message: 'Success! You have been added to the candidates list.'
        };
        this.setState({isCandidate: true});
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
        let message = {
          variant: 'success',
          message: 'You successfully unregistered and removed from the candidates list.'
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
        this.setState({originalDescription: response.contributor.description});
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

  update() {
    if (!this.state.isCandidate) {
      this.setState({ showUnregisterModal: true });
    } else {
      if (this.state.description !== this.state.original_description) {
        this.updateDescription();
      }
    }
  }

  closeUnregisterModal() {
    this.setState({ showUnregisterModal: false });
  }

  onSwitchAction() {
    let value = this.state.isCandidate ? false : true;
    this.setState({isCandidate: value});
  }

  render() {
    const isCandidate = this.props.contributor.is_candidate;
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
                500 characters max. Descriptions are collapsed down to a single continuous paragraph when displayed in the candidates list.
              </Form.Text>
          </Form.Group>
          <span style={{ fontSize: '12px', color: 'gray'}}></span>

          {isCandidate ?
            <>
            <b>Registration</b>
            <br />
            <span style={{ fontSize: '12px'}}>Slide the switch left and then press the Update button to unregister.
            You will be removed from the candidates list.
            You can re-register at any time and your votes and description are restored. You will lose any votes that are changed while you are away.</span>
            <Form.Check
              className='mb-4'
              type="switch"
              id="custom-switch"
              label='Registered'
              checked={this.state.isCandidate}
              onChange={this.onSwitchAction}
            />
            <SpinningButton
              disabled={this.state.isUpdating || (this.state.isCandidate && this.state.description === this.state.originalDescription)}
              buttonText='Update'
              actionButtonText='Updating...'
              action='updatingDescription'
              isUpdating={this.props.isUpdating}
              onClick={this.update} />
            </>
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
