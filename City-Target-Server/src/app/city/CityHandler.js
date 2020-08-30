const City = require('./City');
const { validators } = require('../../helpers');

class CityHandler {

  static addCity (data) {

    if (!validators.isValidStr(data.name)) {

      throw new Error('invalid city name');

    }

    if (!validators.isInteger(data.promo_ratio)) {

      throw new Error('invalid promo ratio');

    }

    if (!validators.isNonZero(+data.promo_ratio) || +data.promo_ratio > 1) {

      throw new Error('promo ratio should be between 0 and 1');

    }

    if (((+data.promo_ratio * 100) % (0.05 * 100)) > 0) {

      throw new Error('promo ratio should be multiplier of 0.05');

    }

    if (!validators.isInteger(data.atf)) {

      throw new Error('invalid atf');

    }

    if (!validators.isInteger(data.booking)) {

      throw new Error('invalid booking');

    }

    const update = {
      name: validators.capitalize(data.name),
      promo_ratio: +data.promo_ratio,
      atf: +data.atf,
      booking: +data.booking
    };

    return City.findOneAndUpdate({ name: validators.capitalize(data.name) }, update, { upsert: true, new: true }).lean().exec();

  }

  static getCities () {

    return City.find({}).sort('name').lean()
      .exec();

  }

  static async getCityByName (name) {

    if (!validators.isValidStr(name)) {

      throw new Error('invalid city name');

    }

    const city = await City.findOne({ name: validators.capitalize(name) }).lean().exec();

    if (!city) {

      throw new Error('city not found');

    }

    return city;

  }

  static deleteCity (id) {

    if (!validators.isValidId(id)) {

      throw new Error('invalid city id');

    }

    const q = {
      _id: validators.isValidId(id)
    };

    return City.remove(q);

  }

}

module.exports = CityHandler;
