import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import SpinningButton from '../utils/spinning_button.js';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.register = this.register.bind(this);

    this.api_url = process.env.REACT_APP_API_GATEWAY + "/api";
  }

  register() {
    if (this.isValidDonationUrl() !== true) {
      alert("The donation URL must be a valid.");
      return;
    }

    this.props.isUpdatingCallback({ 'action' : 'registering'});

    this.print("Calling Register");
    axios.post(this.api_url, {
      command: "Register",
      access_token: this.props.contributor.access_token,
      description: this.props.description,
      donation_url: this.props.donationUrl
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

        this.props.updateState(response.contributor, response.candidates, message);
        this.props.showPage("homePage");
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

  handleError(code, message) {
    if (code === 0 || code === 1) {
      this.props.signOut();
    } else {
      this.props.showAlert({ variant: 'danger', message: message });
    }
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
    this.print("---RegisterPage");

    return(
      <>
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
          </Form.Group>

          { /* donation button */ }
          <b>Donation Button</b>
          <Form.Group controlId="donation">
            <Form.Text className="text-muted">Specify a valid URL to display a donation button linked to the URL. For example https://github.com/sponsors/{this.props.contributor.username}</Form.Text>
            <InputGroup>
              <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                maxLength="100"
                onChange={this.props.handleDonationUrlChange}
                value={this.props.donationUrl} />
            </InputGroup>
          </Form.Group>

          { /* register button */ }
          <Form.Group controlId="description" className="mt-4">
            <SpinningButton
              buttonText='Register'
              actionButtonText='Registering...'
              action='registering'
              isUpdating={this.props.isUpdating}
              onClick={this.register} />
          </Form.Group>
        </Form>
      </div>
      </>
    );
  }
}

export default RegisterPage;
