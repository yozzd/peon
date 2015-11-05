'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var DanaSchema = new Schema({
    dana: {
        type: String,
        default: '',
        trim: true
    }
});

module.exports = mongoose.model('Dana', DanaSchema, 'dana');