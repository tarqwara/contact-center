import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import VoiceMessage from './VoiceMessage';

class VoiceMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceMessages: []
    };
  }

  async componentDidMount() {
    const response = await axios.get('/api/voice');
    this.setState({
      voiceMessages: response.data
    });
  }

  onDelete(sid) {
    const voiceMessages = this.state.voiceMessages.filter(message => message.sid !== sid);
    this.setState({
      voiceMessages
    });
  }

  render() {
    let {voiceMessages} = this.state;
    voiceMessages = voiceMessages.sort((message1, message2) => {
      return moment(message1.date).isAfter(moment(message2.date));
    });
    return (
      voiceMessages.map((message, index) => {
        return <VoiceMessage
          message={message}
          onDelete={this.onDelete.bind(this)}
          key={index}/>;
      })
    );
  }
}

export default VoiceMessages;