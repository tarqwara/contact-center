import React, {Component} from 'react';
import axios from 'axios';

class SmsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      chars: 0,
      maxChars: 1600
    };
  }

  async onSubmit(event) {
    event.preventDefault();

    const {from, to} = this.props;
    const {body} = this.state;
    try {
      await axios.post(`/api/sms/${from}/${to}/${body}`);
      this.onFinished(true);
    } catch (err) {
      this.onFinished(false);
    }
  }

  onChange(event) {
    const {value} = event.target;
    this.setState({
      body: value,
      chars: value.length
    });
  }

  onFinished(result) {
    this.props.onFinished(result);
  }

  render() {
    const {to} = this.props;
    const {body, chars, maxChars} = this.state;
    return (
      <div>
        <h5>Send SMS to {to}</h5>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
          <textarea
            className="form-control"
            rows="4"
            maxLength={maxChars}
            placeholder="Type text here..."
            onChange={this.onChange.bind(this)}/>
          </div>
          <div className="d-flex flex-column align-items-end">
            <em className="mb-2">{`${chars}/${maxChars}`}</em>
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-link"
                onClick={this.onFinished.bind(this)}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={body === ''}>
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SmsForm;