/* eslint-disable no-console */

const config = require('config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);

app.use(bodyParser.json({
  limit: '300mb'
}));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '300mb',
  parameterLimit: 1000000
}));

app.use(express.static('uploads', {
  maxAge: '10d'
}));

app.use(express.static('www', {
  maxAge: '10d'
}));

app.use(express.static('apidoc', {
  maxAge: '10d'
}));

// Express Routes + Middlewares
require('./src/routes/index')(app);

app.get('*', (req, res) => {

  res.json({ success: true });

});

const options = {
  useMongoClient: true
};

const dbConfig = config.get('database');
const dbConnectionURL = `mongodb://${dbConfig.get('userName') !== '' && dbConfig.get('password') !== '' ? `${dbConfig.get('userName')}:${dbConfig.get('password')}@` : ''}${dbConfig.get('host')}:${dbConfig.get('port')}/${dbConfig.get('dbName')}`;

mongoose.Promise = global.Promise;
mongoose.connect(dbConnectionURL, options, (err) => {

  if (err) {

    console.error('ERR:: connecting database', err);

  } else {

    startServer();
    console.log(`connected to database ${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`);

  }

});

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
