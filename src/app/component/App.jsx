import React, {Component} from 'react';
import {ToastContainer, style} from 'react-toastify';
import './App.scss';
import VoiceMessages from './voice-messages/VoiceMessages';

style({
  colorSuccess: '#28a745'
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <ToastContainer/>
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