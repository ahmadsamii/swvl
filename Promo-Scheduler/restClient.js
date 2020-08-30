const request = require('request');

const makeGetRequest = (url, headers = {}) => new Promise((resolve, reject) => {

  url = {
    url,
    headers
  };

  request.get(url, (err, resp, body) => {

    if (err) {

      return reject(err);

    }

    try {

      body = JSON.parse(body);

    } catch (e) {

      return reject(e);

    }

    if (resp.statusCode >= 400) {

      return reject(body);

    }

    return resolve(body);

  });

});

module.exports.makeGetRequest = makeGetRequest;
