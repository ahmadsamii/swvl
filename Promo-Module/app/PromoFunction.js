const config = require('config');
const path = require('path');

const cLog = require('./console');

const RestClient = require('./restClient');

class PromoFunction {

  static async getIdealPromoRatio (data, reqId) {

    cLog.info(`${reqId}: getPromo - validate data`, data);

    if (!data.user_city) {

      throw new Error('invalid user city');

    }

    if (!data.user_segment) {

      throw new Error('invalid user segment');

    }

    cLog.info(`${reqId}: getPromo - getting app configs from config API`, config.get('configAPI'));

    const appConfigs = await RestClient.makeGetRequest(config.get('configAPI'));

    if (!appConfigs || !appConfigs.PROMO_RATIO_MULTIPLIER) {

      throw new Error('failed to fetch promo ratio multiplier factor');

    }

    const cityTargetURL = config.get('cityTarget') + path.join('/api/city', data.user_city);

    cLog.info(`${reqId}: getPromo - getting promo target ratio. URL > `, cityTargetURL);

    const cityTarget = await RestClient.makeGetRequest(cityTargetURL);

    cLog.info(`${reqId}: getPromo - got promo target ratio. data >`, cityTarget);

    if (!cityTarget || !cityTarget.success || !cityTarget.data) {

      throw new Error(`failed to fetch promo ratio for city: ${data.user_city}`);

    }

    const multiplier = appConfigs.PROMO_RATIO_MULTIPLIER[data.user_segment.toUpperCase()];

    cLog.info(`${reqId}: getPromo - promo ratio multiplier`, multiplier);

    // eslint-disable-next-line no-eval
    const promoRatio = cityTarget.data.promo_ratio * eval(multiplier);

    cLog.info(`${reqId}: getPromo - ideal promo ratio calculated is`, promoRatio);

    if (!multiplier) {

      throw new Error('promo ratio multiplier is invalid');

    }

    return {
      promo_ratio: promoRatio
    };

  }

}

module.exports = PromoFunction;
