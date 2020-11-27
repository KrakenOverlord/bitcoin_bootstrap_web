import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirming: false
    }

    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    this.setState({ confirming: true });
    this.props.confirm();
  }

  render() {
    console.log("---ConfirmationModal");

    return (
      <Modal show={true} onHide={this.props.cancel}>
          <Modal.Header closeButton>
            <Modal.Title>RegistrationPage</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to unregister?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.cancel} disabled={this.state.confirming}>
              Cancel
            </Button>

            {this.state.confirming === true &&
              <Button disabled={true} variant="primary">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {' '}Unregistering...
              </Button>
            }
            {this.state.confirming === false &&
              <Button variant="primary" onClick={this.confirm}>
                Unregister
              </Button>
            }
          </Modal.Footer>
        </Modal>
    );
  }
}

export default ConfirmationModal;
