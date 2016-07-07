var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function(app) {
  config = config.init(app)
  var db = mongoose.connect(config.db);
  require('../models/course.server.model.js');
  return db;
};