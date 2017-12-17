import {Router} from 'express';
import React from 'react';
import apiRoutes from './api';

export default Router()
  .get('/', (req, res) => {
    res.render('index');
  })
  .use('/api', apiRoutes);