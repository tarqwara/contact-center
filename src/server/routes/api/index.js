import {Router} from 'express';
import voiceRoutes from './voice.routes';

export default Router()
  .use('/voice', voiceRoutes);