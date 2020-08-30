
const api = require('./api');

module.exports = (app) => {

  app.disable('x-powered-by');

  app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);

    if (req.method === 'OPTIONS') {

      return res.sendStatus(200);

    }

    next();

  });

  app.use('/api/', api);

};
