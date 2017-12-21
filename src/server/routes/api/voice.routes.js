import {Router} from 'express';
import {createCallTwiml, getVoiceMessages, deleteRecording} from 'Service/voice.service';

export default Router()
  .get('/', async (req, res) => {
    const voiceMessages = await getVoiceMessages();
    res.send(voiceMessages);
  })
  .post('/', (req, res) => {
    const twiml = createCallTwiml();
    res.type('text/xml');
    res.send(twiml.toString());
  })
  .delete('/:sid', async (req, res) => {
    const {sid} = req.params;
    const successful = deleteRecording(sid);
    return successful ? res.status(200).end() : res.status(400).end();
  });