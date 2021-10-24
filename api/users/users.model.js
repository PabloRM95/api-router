const mongoose = require('mongoose');

var USERSchema = mongoose.Schema({
    username: {
    type: String,
    minLength: 4,
    required: [true, "usuario necesario"],
    unique: true,
    },
    name: String,
    email: String,
    tweetsIDs : Array 
  
});

var USER = mongoose.model('users', USERSchema);

module.exports = USER;

