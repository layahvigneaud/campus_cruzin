
const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema({
    name: String,
    description: String,
    tags: Array,
    moreInfo: String,
  });
  
const Club = mongoose.model('Club', clubSchema);
module.exports = Club;
