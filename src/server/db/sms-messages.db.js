import {query} from './index';

export const fetchSmsMessages = async () => {
  try {
    const {rows} = await query('SELECT id, "to", body, created FROM sms_message ORDER BY created');
    return rows;
  } catch (err) {
    console.error(`Could not fetch sms messages:\n${err}`);
  }
};

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