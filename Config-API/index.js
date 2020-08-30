/* eslint-disable no-console */

const config = require('config');
const express = require('express');

const app = express();
const http = require('http').Server(app);

app.disable('x-powered-by');

app.get('/', (req, res) => res.status(200).json({
  PROMO_RATIO_MULTIPLIER: config.get('PROMO_RATIO_MULTIPLIER')
}));

const startServer = () => {

  const server = http.listen(config.port, (err) => {

    if (err) {

      console.error('ERR:: launching server ', err);

    } else {

      console.log(`API server is live at ${config.host}:${config.port}`);

    }

  });

  server.timeout = 4 * 60 * 1000;

};

startServer();
