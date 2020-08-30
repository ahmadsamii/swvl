/* eslint-disable no-console */

const config = require('config');
const express = require('express');
const morgan = require('morgan');

const app = express();
const http = require('http').Server(app);

const PromoFunction = require('./app/PromoFunction');
const cLog = require('./app/console');

const format = ':id :method :http-version :url :remote-addr :user-agent - :status :response-time ms :total-time ms - :res[content-length]';

const getUuid = (req, res) => req.id;

morgan.token('id', getUuid);

app.use(morgan(`[:date[iso]] REQUEST >> ${format}`, { immediate: true }));
app.use(morgan(`[:date[iso]] RESPONSE >> ${format}`, { immediate: false }));

app.get('/', async (req, res) => {

  const reqId = Date.now();

  cLog.info(`${reqId}: getPromo - `, req.query);

  try {

    const ratio = await PromoFunction.getIdealPromoRatio(req.query, reqId);

    res.status(200).json(ratio);

    cLog.success(`${reqId}: getPromo completed - `, ratio);

  } catch (error) {

    cLog.error(`${reqId}: getPromo error - `, error.message);

    return res.status(500).json({ success: false, message: error.message });

  }

});

http.listen(config.port, (err) => {

  if (err) {

    console.error('ERR:: launching server ', err);

  } else {

    console.log(`API server is live at ${config.host}:${config.port}`);

  }

});
