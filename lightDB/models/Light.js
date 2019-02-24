var mongoose = require('mongoose');

var lightSchema = mongoose.Schema({
    Id: Number,
    X: Number,
    Y: Number,
    Intensity: Number,
    Last: Number,
});

module.exports = mongoose.model('light', lightSchema);