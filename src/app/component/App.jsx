import React, {Component} from 'react';
import {ToastContainer, style} from 'react-toastify';
import './App.scss';
import Dashboard from './dashboard/Dashboard';

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
        <Dashboard/>
      </div>
    );
  }
}

export default App;