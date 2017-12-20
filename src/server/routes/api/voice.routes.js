import {Router} from 'express';
import {createCallTwiml, getVoiceMessages} from './../../service/voice.service';

export default Router()
  .get('/', async (req, res) => {
    const voiceMessages = await getVoiceMessages();
    res.send(voiceMessages);
  })
  .post('/', (req, res) => {
    const twiml = createCallTwiml();
    res.type('text/xml');
    res.send(twiml.toString());
  });