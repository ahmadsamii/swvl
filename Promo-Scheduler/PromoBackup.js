
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MongoSchema = new Schema({

  user_id: {
    type: Number,
    required: true
  },

  user_city: {
    type: String,
    required: true
  },

  user_segment: {
    type: String,
    required: true
  },

  promo_ratio: {
    type: Number,
    required: true
  }

}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('PromoBackup', MongoSchema);
