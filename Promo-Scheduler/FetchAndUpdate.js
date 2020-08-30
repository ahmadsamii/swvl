const jsonfile = require('jsonfile');
const config = require('config');
const { promisify } = require('util');
const RestClient = require('./restClient');
const cLog = require('./console');

const Backup = require('./PromoBackup');

const fetchPromos = async () => {

  cLog.info('reading user data file', config.get('userDataFile'));

  const usersData = await promisify(jsonfile.readFile)(config.get('userDataFile'));

  if (!usersData || !usersData.data || !usersData.data.length) {

    throw new Error('users data is not valid or is empty');

  }

  cLog.info('completed reading user data. total records', usersData.data.length);

  const userPromos = [];

  for (const user of usersData.data) {

    cLog.info('fetching user promo for user', user);

    const userPromo = await RestClient.makeGetRequest(`${config.get('promoServiceUrl')}?user_city=${user.user_city}&user_segment=${user.user_segment}`);

    cLog.info('got promo for user', user.user_id, userPromo);

    userPromos.push(Object.assign(user, userPromo));

  }

  cLog.success('completed all users promo fetch');

  return userPromos;

};

const updateDB = async (data) => {

  for (const record of data) {

    cLog.info('saving record', record);
    const bckup = new Backup(record);
    await bckup.save();
    cLog.success('record saved successfully', record);

  }

};

const fetchAndUpdateDB = async () => {

  cLog.info('start fetching user promos');

  const promos = await fetchPromos();

  cLog.info('starting database population');

  await updateDB(promos);

  cLog.success('database population is completed.');

};

exports.fetchAndUpdateDB = fetchAndUpdateDB;
