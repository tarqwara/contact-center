import twilio from 'twilio';

export {
  fetchVoiceMessages,
  storeVoiceMessage,
  updateVoiceMessageToListened,
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