
const express = require('express');

const app = express.Router({
  mergeParams: true
});

const city = require('./city');

app.use('/city/', city);

app.use('*', (req, res) => {

  res.status(404).json({ success: false, message: 'invalid API endpoint' });

});

module.exports = app;
