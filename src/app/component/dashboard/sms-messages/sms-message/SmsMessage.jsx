import React, {Component} from 'react';
import {formatDate} from 'Util/date.util';

class SmsMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {to, created, body} = this.props.message;
    return (
      <div
        className="card bg-light border-dark d-flex flex-row mt-2">
        <div className="card-body">
          <h5 className="card-title">
            {to}
          </h5>
          <h6 className="card-subtitle text-muted">
            {formatDate(created)}
          </h6>
          <p className="card-text pt-3">
            {body}
          </p>
        </div>
      </div>
    );
  }
}

export default SmsMessage;