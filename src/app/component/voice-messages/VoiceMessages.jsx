import React, {Component} from 'react';
import axios from 'axios';
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

  render() {
    return (
      this.state.voiceMessages.map((message, index) => {
        return <VoiceMessage
          message={message}
          key={index}/>;
      })
    );
  }
}

export default VoiceMessages;