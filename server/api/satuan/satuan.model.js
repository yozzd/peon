'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SatuanSchema = new Schema({
    satuan: {
        type: String,
        default: '',
        trim: true
    }
});

module.exports = mongoose.model('Satuan', SatuanSchema, 'satuan');