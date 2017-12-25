import {query} from './index';

export const storeSmsMessage = async (accountSid, smsSid, from, to, body) => {
  try {
    await query(`INSERT INTO sms_message (account_sid, sms_sid, "from", "to", body) VALUES ($1, $2, $3, $4, $5)`, [
      accountSid,
      smsSid,
      from,
      to,
      body
    ]);
  } catch (err) {
    console.error(`Could not store sms message [smsSid: ${smsSid}]:\n${err}`);
  }
};