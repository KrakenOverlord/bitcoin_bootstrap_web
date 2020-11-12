import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import ConfirmationModal from './confirmation_modal.js';

class Registration extends React.Component {
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
    this.updateBlurb = this.updateBlurb.bind(this);
    this.handleBlurbChange = this.handleBlurbChange.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  handleBlurbChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  register() {
    console.log("Calling register");
    axios.post(this.api_url + "/register?access_token=" + this.props.contributor.access_token + "&description=" + this.state.description)
      .then((res) => {
        var response = res.data;
        console.log("register response: " + JSON.stringify(response));

        if (response.error === true) {
          this.handleError(response);
        } else {
          this.props.updateState(response.contributor, response.candidates, { variant: 'success', message: 'You have successfully registered.' });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unregister() {
    this.setState({ showUnregisterModal: true });
  }

  unregisterConfirmed() {
    console.log("Calling unregister");
    axios.post(this.api_url + "/unregister?access_token=" + this.props.contributor.access_token)
      .then((res) => {
        var response = res.data;
        console.log("unregister response: " + JSON.stringify(response));

        if (response.error === true) {
          this.handleError(response);
        } else {
          this.setState({ description: '' });
          this.props.updateState(response.contributor, response.candidates, { variant: 'success', message: 'You have successfully unregistered.' });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.closeUnregisterModal();
      });
  }

  closeUnregisterModal() {
    this.setState({ showUnregisterModal: false });
  }

  updateBlurb() {
    console.log("Calling update_description");
    axios.post(this.api_url + "/update_description?access_token=" + this.props.contributor.access_token +"&description=" + this.state.description)
      .then((res) => {
        var response = res.data;
        console.log("update_description response: " + JSON.stringify(response));

        if (response.error === true) {
          this.handleError(response);
        } else {
          this.props.updateState(response.contributor, response.candidates, { variant: 'success', message: 'You have successfully updated your description.' });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleError(response) {
    if (response.error_code === 0 || response.error_code === 1) {
      localStorage.removeItem('access_token');
      this.props.setState({
        contributor: null
      });
    } else if (response.error_code === 2 || response.error_code === 3) {
      console.log("Invalid request: " + response.error_code);
    } else if (response.error_code === 100) {
      alert("Internal server error: " + response.error_code);
    }
    else {
      console.log("Error: " + response.error_code);
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
              <b>To Register</b>
              <p>Simply tell us why you should receive funding and press the "Register" button.</p>
              <p />
              <p>TIP - Include information on how people can get money to you either in the description below or on your GitHub profile page.</p>
              </>
            </Card.Body>
          </Card>
        }
        {this.props.contributor.is_candidate === true &&
          <Card bg='light'>
            <Card.Body>
              <>
              <span>You are registered as a candidate. You can either update your description or unregister.</span>
              </>
            </Card.Body>
          </Card>
        }

        <Form className='mt-3'>
          <Form.Group controlId="description">
            <Form.Label>Why should you receive funding? (250 characters max)</Form.Label>
            <Form.Control name="description" as="textarea" rows={3} maxLength="250" onChange={this.handleBlurbChange} value={this.state.description} />
          </Form.Group>
          {this.props.contributor.is_candidate === false &&
            <Button onClick={this.register}>Register</Button>
          }
          {this.props.contributor.is_candidate === true &&
            <>
            <Button onClick={this.updateBlurb}>Update</Button>
            <Button className="ml-2" onClick={this.unregister}>Unregister</Button>
            </>
          }
        </Form>
      </div>
      </>
    );
  }
}

export default Registration;
