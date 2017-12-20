import React, {Component} from 'react';
import './App.scss';
import VoiceMessages from './voice-messages/VoiceMessages';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4">
          Contact center
        </h1>
        <hr/>
        <VoiceMessages/>
      </div>
    );
  }
}

export default App;