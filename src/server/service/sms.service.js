import twilioApi from 'Api/twilio.api';

export {fetchSmsMessages, storeSmsMessage} from 'Db/sms-messages.db';

export const sendSmsMessage = async (from, to, body) => {
  try {
    return await twilioApi.messages.create({
      from,
      to,
      body
    });
  } catch (err) {
    console.error(`Could not send sms message to ${to}:\n${err}`);
  }
};