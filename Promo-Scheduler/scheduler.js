/* eslint-disable no-console */

const config = require('config');
const mongoose = require('mongoose');

const PromoModule = require('./FetchAndUpdate');
const cLog = require('./console');

const connectDb = () => new Promise((resolve, reject) => {

  const options = {
    useMongoClient: true
  };

  const dbConfig = config.get('database');
  const dbConnectionURL = `mongodb://${dbConfig.get('userName') !== '' && dbConfig.get('password') !== '' ? `${dbConfig.get('userName')}:${dbConfig.get('password')}@` : ''}${dbConfig.get('host')}:${dbConfig.get('port')}/${dbConfig.get('dbName')}`;

  mongoose.Promise = global.Promise;
  mongoose.connect(dbConnectionURL, options, async (err) => {

    if (err) {

      cLog.error('ERR:: connecting database', err);
      reject(err);

    } else {

      cLog.success(`connected to database ${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`);
      resolve();

    }

  });

});

const start = async () => {

  try {

    cLog.info('starting scheduler. connecting databse', config.database);
    await connectDb();

    cLog.info('starting data script');
    await PromoModule.fetchAndUpdateDB();

    cLog.success('data update completed successfully');

  } catch (error) {

    cLog.error('script execution failed', error);

  } finally {

    process.exit();

  }

};

start();
