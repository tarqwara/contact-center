import React, {Component} from 'react';
import VoiceMessages from './voice-messages/VoiceMessages';
import SmsMessages from './sms-messages/SmsMessages';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul className="nav nav-pills" role="tablist">
          <li className="nav-item">
            <a className="nav-link active"
               id="pills-voice-messages-tab"
               data-toggle="pill"
               href={"#pills-voice-messages"}
               role="tab"
               aria-controls="pills-voice-messages"
               aria-selected="true">
              Voice messages
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link"
               id="pills-sms-messages-tab"
               data-toggle="pill"
               href={"#pills-sms-messages"}
               role="tab"
               aria-controls="pills-sms-messages"
               aria-selected="false">
              Sent SMS messages
            </a>
          </li>
        </ul>
        <div className="tab-content pt-3">
          <div className="tab-pane fade show active"
               id="pills-voice-messages"
               role="tabpanel"
               aria-labelledby="pills-voice-messages-tab">
            <VoiceMessages/>
          </div>
          <div className="tab-pane fade"
               id="pills-sms-messages"
               role="tabpanel"
               aria-labelledby="pills-sms-messages-tab">
            <SmsMessages/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;