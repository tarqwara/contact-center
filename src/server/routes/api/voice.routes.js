import {Router} from 'express';
import {createCallRecordTwiml, sendSmsMessage, getVoiceMessages, deleteRecording} from 'Service/voice.service';

export default Router()
  .get('/', async (req, res) => {
    const voiceMessages = await getVoiceMessages();
    res.send(voiceMessages);
  })
  .post('/', (req, res) => {
    const twiml = createCallRecordTwiml('Thank you for calling us, please leave a message after the beep');
    res.type('text/xml');
    res.send(twiml.toString());
  })
  .post('/completed', (req, res) => {
    console.log(req.params);
    const {from, to} = req.params;
    sendSmsMessage('Thank you for contacting us, will get back to you as shortly as we can', to, from);
    res.status(200).end();
  })
  .delete('/:sid', async (req, res) => {
    const {sid} = req.params;
    const successful = deleteRecording(sid);
    return successful ? res.status(200).end() : res.status(400).end();
  });