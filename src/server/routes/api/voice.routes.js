import {Router} from 'express';
import {createCallTwiml, getCalls} from '../../service/voice.service';

export default Router()
  .get('/', async (req, res) => {
    const calls = await getCalls();
    res.send(calls);
  })
  .post('/', (req, res) => {
    const twiml = createCallTwiml();
    res.type('text/xml');
    res.send(twiml.toString());
  });