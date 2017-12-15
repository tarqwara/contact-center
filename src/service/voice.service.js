import {twiml} from 'twilio';
import twilioApi from '../api/twilio.api';

export const createCallTwiml = () => {
  const twiml = new twiml.VoiceResponse();
  twiml.say("Thank you for calling us, please leave a message after the beep");
  twiml.record();
  twiml.hangup();
  return twiml;
};

export const getCalls = async () => {
  const calls = await twilioApi
    .calls
    .list({status: 'completed'});
  return calls
    .map(call => {
      const{from, endTime} = call;
      return {
        from,
        endTime
      };
    });
};