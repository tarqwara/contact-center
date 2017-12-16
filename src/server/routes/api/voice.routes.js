import {Router} from 'express';
import {createCallTwiml, getCallsWithRecordings} from '../../../service/voice.service';

export default Router()
  .get('/', async (req, res) => {
    const calls = await getCallsWithRecordings();
    res.send(calls);
  })
  .post('/', (req, res) => {
    const twiml = createCallTwiml();
    res.type('text/xml');
    res.send(twiml.toString());
  });