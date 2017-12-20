import twilio from 'twilio';
import twilioApi, {baseUrl} from 'Api/twilio.api';
import url from 'url';

const VoiceResponse = twilio.twiml.VoiceResponse;

export const createCallTwiml = () => {
  const twiml = new VoiceResponse();
  twiml.say("Thank you for calling us, please leave a message after the beep");
  twiml.record();
  twiml.hangup();
  twiml.message('Thank you for contacting us, will get back to you as shortly as we can');
  return twiml;
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