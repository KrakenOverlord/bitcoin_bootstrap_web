import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import SpinningButton from '../utils/spinning_button.js';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.register = this.register.bind(this);
  }

  print(message) {
    if (process.env.REACT_APP_DEVELOPMENT) {
      console.log(message);
    }
  }

  register() {
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

    this.props.register();
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
