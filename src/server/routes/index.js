import {Router} from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import template from './template';
import apiRoutes from './api';
import App from '../../client/App';

export default Router()
  .get('/', (req, res) => {
    const body = renderToString(<App/>);
    res.send(template({
      body,
      title: 'Contact center'
    }));
  })
  .use('/api', apiRoutes);