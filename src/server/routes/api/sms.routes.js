import {Router} from 'express';
import {sendSmsMessage, storeSmsMessage} from 'Service/sms.service';

export default Router()
  .post('/:from/:to/:body', async (req, res) => {
    const {from, to, body} = req.params;
    const smsMessage = await sendSmsMessage(from, to, body);
    if (smsMessage) {
      const {accountSid, sid} = smsMessage;
      await storeSmsMessage(accountSid, sid, from, to, body);
    }
    res.type('application/json');
    smsMessage ? res.status(200).end() : res.status(400).end();
  });