import React from 'react';
import Alert from 'react-bootstrap/Alert';

class AlertMessage extends React.Component {
  render() {
    return (
      <Alert variant={this.props.alert.variant} onClose={this.props.deleteAlert} dismissible>
        <Alert.Heading>{this.props.alert.title}</Alert.Heading>
        <p>
          {this.props.alert.message}
        </p>
      </Alert>
    );
  }
}

export default AlertMessage;
