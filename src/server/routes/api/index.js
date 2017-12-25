import {Router} from 'express';
import voiceRoutes from './voice.routes';
import smsRoutes from './sms.routes';

export default Router()
  .use('/voice', voiceRoutes)
  .use('/sms', smsRoutes);