import twilio from 'twilio';
import twilioApi, {baseUrl} from 'Api/twilio.api';
import url from 'url';

const VoiceResponse = twilio.twiml.VoiceResponse;

export const createCallRecordTwiml = message => {
  const twiml = new VoiceResponse();
  twiml.say(message);
  twiml.record();
  twiml.hangup();
  return twiml;
};

export const sendSmsMessage = (body, from, to) => {
  twilioApi.messages.create({
    body,
    from,
    to
  });
};

const getRecordings = () => twilioApi.recordings.list();

const getCall = sid => twilioApi.calls.get(sid).fetch();

const createVoiceMessage = async recording => {
  const {callSid, duration, sid, uri} = recording;
  const {from, endTime} = await getCall(callSid);
  const recordingUrl = url.resolve(baseUrl, uri.replace('.json', ''));
  return {
    sid,
    duration,
    from,
    date: endTime,
    recordingUrl
  };
};

export const getVoiceMessages = async () => {
  const recordings = await getRecordings();
  const voiceMessages = [];
  for (let recording of recordings) {
    const voiceMessage = await createVoiceMessage(recording);
    voiceMessages.push(voiceMessage);
  }
  return voiceMessages;
};

export const deleteRecording = async sid => {
  try {
    await twilioApi.recordings(sid).remove();
    return true;
  } catch (err) {
    console.error(`Could not delete recording with sid ${sid}: ${err}`);
    return false;
  }
};