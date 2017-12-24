import twilio from 'twilio';
import twilioApi from 'Api/twilio.api';

export {
  fetchVoiceMessages,
  createVoiceMessage,
  updateVoiceMessageListened,
  deleteVoiceMessage
} from 'Db/voice-messages.db';

const VoiceResponse = twilio.twiml.VoiceResponse;

export const createVoiceMessageTwiml = message => {
  const twiml = new VoiceResponse();
  twiml.say(message);
  twiml.record({
    action: '/api/voice/completed'
  });
  twiml.hangup();
  return twiml;
};

export const sendSmsMessage = (body, from, to) =>
  twilioApi.messages.create({
    body,
    from,
    to
  });