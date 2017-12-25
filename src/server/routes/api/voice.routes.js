import {Router} from 'express';
import {
  fetchVoiceMessages,
  storeVoiceMessage,
  createVoiceMessageTwiml,
  updateVoiceMessageToListened,
  deleteVoiceMessage
} from 'Service/voice.service';
import {sendSmsMessage} from 'Service/sms.service';

export default Router()
  .get('/', async (req, res) => {
    const voiceMessages = await fetchVoiceMessages();
    res.type('application/json');
    res.send(voiceMessages);
  })
  .post('/', async (req, res) => {
    const twiml = createVoiceMessageTwiml('Thank you for calling us, please leave a message after the beep');
    res.type('text/xml');
    res.send(twiml.toString());
  })
  .post('/completed', async (req, res) => {
    const {AccountSid, CallSid, From, To, RecordingSid, RecordingUrl} = req.body;
    await storeVoiceMessage(AccountSid, CallSid, From, To, RecordingSid, RecordingUrl);
    await sendSmsMessage(To, From, 'Thank you for contacting us, will get back to you as shortly as we can');
    res.type('text/xml');
    res.status(200).end();
  })
  .post('/:id/listened', async (req, res) => {
    const {id} = req.params;
    await updateVoiceMessageToListened(id);
    res.type('application/json');
    res.status(200).end();
  })
  .delete('/:id', async (req, res) => {
    const {id} = req.params;
    const successful = await deleteVoiceMessage(id);
    res.type('application/json');
    successful ? res.status(200).end() : res.status(400).end();
  });