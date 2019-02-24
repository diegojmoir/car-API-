var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    Proximity: Number, 
    Temperature: Number, 
    Humidity: Number, 
});

module.exports = mongoose.model('car', carSchema);