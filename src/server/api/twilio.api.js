import {Twilio} from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
export const baseUrl = 'https://api.twilio.com';

export default new Twilio(accountSid, authToken);