import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class Enroll extends React.Component {
  render() {
    if (this.props.user.is_candidate === false) {
      return (
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Why should people fund you?</Form.Label>
            <Form.Control type="text" placeholder="Enter blurb" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enroll Me
          </Button>
        </Form>
      );
    } else {
      return(
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Why should people fund you?</Form.Label>
            <Form.Control type="text" placeholder="Enter blurb" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Unregister
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      );
    }
  }
}

export default Enroll;
