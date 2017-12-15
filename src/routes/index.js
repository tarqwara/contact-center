import {Router} from 'express';
import apiRoutes from './api';

export default Router()
  .get('/', (req, res) => {
    res.render('index', {title: 'Contact center'});
  })
  .use('/api', apiRoutes);