import React, {Component} from 'react';
import axios from 'axios';
import Loader from 'Component/loader/Loader';
import SmsMessage from 'Component/sms-messages/SmsMessage';

class SmsMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smsMessages: [],
      loading: true
    };
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/sms');
    this.setState({
      smsMessages: data,
      loading: false
    });
  }

  render() {
    const {smsMessages, loading} = this.state;
    if (loading) {
      return <Loader/>;
    } else if (!smsMessages.length) {
      return (
        <div className="alert alert-info" role="alert">
          No SMS messages found.
        </div>
      );
    }

    return (
      smsMessages.map(message => {
        const {id} = message;
        return <SmsMessage
          message={message}
          key={id}/>;
      })
    );
  }
}

export default SmsMessages;