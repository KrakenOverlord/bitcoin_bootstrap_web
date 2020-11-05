import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blurb: ''
    };

    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
    this.updateBlurb = this.updateBlurb.bind(this);
    this.handleBlurbChange = this.handleBlurbChange.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.api_url = 'http://localhost:3000';
    } else {
      this.api_url = 'https://bitcoinbootstrap.org';
    }
  }

  register() {
    axios.post(this.api_url + "/register?session_id=" + this.props.contributor.session_id + "&blurb=" + this.state.blurb)
      .then((response) => {
        this.props.changedRegistration(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unregister() {
    axios.post(this.api_url + "/unregister?session_id=" + this.props.contributor.session_id)
      .then((response) => {
        this.props.changedRegistration(response.data);
        document.getElementById('blurb').value = '';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateBlurb() {
    axios.post(this.api_url + "/update_blurb?session_id=" + this.props.contributor.session_id +"&blurb=" + this.state.blurb)
      .then((response) => {
        this.props.changedRegistration(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleBlurbChange(event) {
    this.setState({
      blurb: event.target.value
    });
  }

  render() {
    if (this.props.contributor.is_candidate === false) {
      return (
        <Form>
          <Form.Group controlId="blurb">
            <Form.Label>Why should you receive funding?</Form.Label>
            <Form.Control name="blurb" as="textarea" rows={3} maxLength="200" onChange={this.handleBlurbChange} defaultValue='' />
          </Form.Group>
          <Button variant="primary" onClick={this.register}>
            Register
          </Button>
        </Form>
      );
    } else {
      return(
        <Form>
          <Form.Group controlId="blurb">
            <Form.Label>Why should you receive funding?</Form.Label>
            <Form.Control name="blurb" as="textarea" rows={3} maxLength="200" onChange={this.handleBlurbChange} defaultValue={this.props.contributor.blurb} />
          </Form.Group>
          <Button variant="primary" onClick={this.updateBlurb}>
            Update Blurb
          </Button>
          <Button variant="primary" onClick={this.unregister}>
            Unregister
          </Button>
        </Form>
      );
    }
  }
}

export default Registration;
