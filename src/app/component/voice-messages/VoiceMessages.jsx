import React, {Component} from 'react';
import axios from 'axios';
import VoiceMessage from './VoiceMessage';
import Loader from 'Component/loader/Loader';

class VoiceMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceMessages: [],
      loading: true
    };
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/voice');
    this.setState({
      voiceMessages: data,
      loading: false
    });
  }

  onDelete(id) {
    const voiceMessages = this.state.voiceMessages.filter(message => message.id !== id);
    this.setState({
      voiceMessages
    });
  }

  onListened(id) {
    const voiceMessages = this.state.voiceMessages;
    const voiceMessage = voiceMessages.find(message => message.id === id);
    voiceMessage.listened = true;
    this.setState({
      voiceMessages
    });
  }

  render() {
    let {voiceMessages, loading} = this.state;
    if (loading) {
      return (
        <Loader/>
      );
    } else if (!voiceMessages.length) {
      return (
        <div className="alert alert-info" role="alert">
          No voice messages found.
        </div>
      );
    }

    return (
      voiceMessages.map(message => {
        const {id} = message;
        return <VoiceMessage
          message={message}
          onDelete={this.onDelete.bind(this)}
          onListened={this.onListened.bind(this)}
          key={id}/>;
      })
    );
  }
}

export default VoiceMessages;