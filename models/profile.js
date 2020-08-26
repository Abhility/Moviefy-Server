const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlist = new Schema({
      userId: {
          type: String,
          require: true,
          unique: true
      },
      list: {
          type: [String]
      }
});

module.exports = mongoose.model('watchlist',watchlist,'User_watchlist');