import {Router} from 'express';
import voiceRoutes from 'Route/api/voice.routes';
import smsRoutes from 'Route/api/sms.routes';

export default Router()
  .use('/voice', voiceRoutes)
  .use('/sms', smsRoutes);