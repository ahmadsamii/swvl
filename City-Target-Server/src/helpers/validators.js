
const ObjectId = require('mongoose').Types.ObjectId;

class Validators {

  static isValidId (str) {

    try {

      const nid = new ObjectId(str);

      return ((nid.toString() === str) ? nid : null);

    } catch (e) {

      return null;

    }

  }

  static isInteger (value) {

    return !!((+value + 1));

  }

  static sanitizePhone (phone) {

    if (!Validators.isValidStr(phone)) {

      return null;

    }

    phone = phone.replace(/[^\d]/g, '').replace(/\s/g, '');

    if (!Validators.isInteger(phone)) {

      return null;

    }

    if (phone.startsWith('3')) {

      phone = `0${phone}`;

    }

    if (phone.startsWith('03') && phone.length === 11) {

      return phone;

    }

    return null;

  }

  static isNonZero (value) {

    return (!!((+value + 1)) && +value > 0);

  }

  static isValidStr (str) {

    if (!str) {

      return false;

    }

    return (str && typeof (str) === 'string' && str.trim() && str !== '');

  }

  static isValidJSON (str) {

    if (!str) {

      return false;

    }

    if (typeof str === 'string') {

      try {

        str = JSON.parse(str);

      } catch (e) {

        return false;

      }

    }

    return (!!Object.keys(str).length);

  }

  static getParsedJson (data) {

    if (!data) {

      return null;

    }

    if (typeof data === 'string') {

      try {

        return JSON.parse(data);

      } catch (e) {

        return null;

      }

    } else if (Object.keys(data).length) {

      return data;

    }

  }

  static isArray (variable) {

    return (variable && (Object.prototype.toString.call(variable) === '[object Array]') && Array.isArray(variable));

  }

  static getPageOptions (query) {

    const options = {
      page: +query.page || 1,
      limit: ((+query.limit && +query.limit < 50) ? +query.limit : 0) || 10,
      leanWithId: true,
      lean: true,
      sort: {
        name: 1
      }
    };

    if (query.sort) {

      options.sort = {};

      if (query.sort[0] === '-') {

        options.sort[(query.sort.split('-')[1] || 'name')] = -1;

      } else {

        options.sort[(query.sort.toString() || 'name')] = 1;

      }

    }

    return options;

  }

  static parseSelectFields (query) {

    const fields = (query.fields && query.fields.split(',')) || [];

    if (!fields || !fields.length) {

      return null;

    }

    return fields.join(' ');

  }

  static getProductPageOptions (query) {

    const pop = [];
    const options = Validators.getPageOptions(query);
    const fields = (query.fields && query.fields.split(',')) || [];

    if (fields.length) {

      options.select = fields.join(' ');

      if (fields.includes('category')) {

        pop.push({ path: 'category', select: 'name active' });

      }

      if (fields.includes('subcategory')) {

        pop.push({ path: 'subcategory', select: 'name active' });

      }

    } else {

      pop.push({ path: 'category', select: 'name active' });
      pop.push({ path: 'subcategory', select: 'name active' });

    }

    options.sort = { rank: -1, name: 1 };
    options.populate = pop;

    return options;

  }

  static getOrderPageOptions (query) {

    const pop = [];
    const options = Validators.getPageOptions(query);
    const fields = (query.fields && query.fields.split(',')) || [];

    if (fields.length) {

      options.select = fields.join(' ');

      if (fields.includes('staff')) {

        pop.push({ path: 'staff', select: 'name phone' });

      }

      if (fields.includes('user')) {

        pop.push({ path: 'user', select: 'name' });

      }

      if (fields.includes('city')) {

        pop.push({ path: 'city', select: 'name' });

      }

      if (fields.includes('zone')) {

        pop.push({ path: 'zone', select: 'name' });

      }

    } else {

      pop.push({ path: 'staff', select: 'name phone' });
      pop.push({ path: 'user', select: 'name' });
      pop.push({ path: 'city', select: 'name' });
      pop.push({ path: 'zone', select: 'name' });

    }

    options.populate = pop;
    options.sort = {
      orderId: -1
    };

    return options;

  }

  static capitalize (string) {

    return string && string.replace(/\b\w/g, l => l.toUpperCase());

  }

  static slugify (string) {

    return string.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

  }

  static getRespUser (user, token = null) {

    const respUser = {

      _id: user._id,
      name: user.name,
      email: user.email

    };

    if (token) {

      respUser.token = token;

    }

    return respUser;

  }

}

module.exports = Validators;
