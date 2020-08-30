
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MongoSchema = new Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  promo_ratio: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },

  atf: {
    type: Number,
    required: true
  },

  booking: {
    type: Number,
    required: true
  }

}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('City', MongoSchema);
