import React, {Component} from 'react';
import {toast} from 'react-toastify';
import swal from 'sweetalert';
import axios from 'axios';
import './VoiceMessage.scss';

class VoiceMessage extends Component {
  constructor(props) {
    super(props);
  }

  addListenedEvent(id) {
    this.audio.onplay = async () => {
      const {listened} = this.props.message;
      if (listened) {
        return;
      }
      try {
        await axios.post(`/api/voice/${id}/listened`);
        this.props.onListened(id);
      } catch (err) {
        console.error(`Could not update listened field of voice message ${id}`);
      }
    };
  }

  async componentDidMount() {
    const {id, recordingUrl} = this.props.message;
    if (recordingUrl) {
      this.addListenedEvent(id);
    }
  }

  formatDate(date) {
    return new Date(date).toLocaleString()
  }

  async delete(id) {
    const confirm = await swal({
      title: "Are you sure?",
      buttons: true,
      dangerMode: true,
    });
    if (!confirm) {
      return;
    }

    try {
      await axios.delete(`/api/voice/${id}`);
    } catch (err) {
      toast.error('Could not delete voice message');
      return;
    }

    toast.success('Voice message deleted');
    this.props.onDelete(id);
  }

  render() {
    const {id, from, created, listened, recordingUrl} = this.props.message;
    return (
      <div
        className="card bg-light border-primary d-flex flex-row mt-2">
        <div className="card-body mr-5">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              {
                !listened &&
                <div className="mr-3">
                  <i className="material-icons fiber-new">fiber_new</i>
                </div>
              }
              <div>
                <h5 className="card-title">
                  {from}
                </h5>
                <h6 className="card-subtitle text-muted">
                  {this.formatDate(created)}
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center">
              {
                recordingUrl ?
                  <audio controls
                         ref={audio => {
                           this.audio = audio;
                         }}>
                    <source src={recordingUrl} type="audio/wav"/>
                  </audio> :
                  <em>No recording available</em>
              }
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center delete-container">
          <i className="material-icons delete"
             onClick={() => this.delete(id)}>delete</i>
        </div>
      </div>
    );
  }
}

export default VoiceMessage;