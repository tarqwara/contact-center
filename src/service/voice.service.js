import {twiml} from 'twilio';
import twilioApi, {baseUrl} from '../server/api/twilio.api';
import path from 'path';

export const createCallTwiml = () => {
  const twiml = new twiml.VoiceResponse();
  twiml.say("Thank you for calling us, please leave a message after the beep");
  twiml.record();
  twiml.hangup();
  twiml.message('Thank you for contacting us, will get back to you as shortly as we can');
  return twiml;
};

const getRecordings = () => twilioApi.recordings.list();

const getCall = sid => twilioApi.calls.get(sid).fetch();

const createCallWithRecording = async recording => {
  const {callSid, uri, duration} = recording;
  const {from, endTime} = await getCall(callSid);
  const recordingUrl = path.join(baseUrl, uri.replace('.json', ''));
  return {
    duration,
    from,
    endTime,
    recordingUrl
  };
};

export const getCallsWithRecordings = async () => {
  const recordings = await getRecordings();
  const callsWithRecordings = [];
  for (let recording of recordings) {
    const callWithRecording = await createCallWithRecording(recording);
    callsWithRecordings.push(callWithRecording);
  }
  return callsWithRecordings;
};