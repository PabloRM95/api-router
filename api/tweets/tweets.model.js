const mongoose = require('mongoose');

var TWEETSchema = mongoose.Schema({
    text: String,
    owner: String,
    createdAt: Date,
});

var TWEET = mongoose.model('tweets', TWEETSchema);

module.exports = TWEET;



