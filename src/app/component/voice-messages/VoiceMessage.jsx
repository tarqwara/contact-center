import React, {Component} from 'react';
import moment from 'moment';
import './VoiceMessage.scss';

class VoiceMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listened: false
    };
  }

  componentDidMount() {
    this.audio.onplay = () => {
      this.setState({
        listened: true
      });
    };
  }

  formatDate(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  render() {
    const {from, date, recordingUrl} = this.props.message;
    return (
      <div
        className="card bg-light border-primary">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              {
                !this.state.listened &&
                <div className="mr-3">
                  <i className="material-icons fiber-new">fiber_new</i>
                </div>
              }
              <div>
                <h5 className="card-title">
                  {from}
                </h5>
                <h6 className="card-subtitle text-muted">
                  {this.formatDate(date)}
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <audio controls
                     ref={audio => {
                       this.audio = audio;
                     }}>
                <source src={recordingUrl} type="audio/wav"/>
              </audio>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VoiceMessage;