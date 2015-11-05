'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProgramSchema = new Schema({
    k1: {
        type: String,
        default: '',
        trim: true
    },
    k2: {
        type: String,
        default: '',
        trim: true
    },
    k3: {
        type: String,
        default: '',
        trim: true
    },
    k4: {
        type: String,
        default: '',
        trim: true
    },
    uraian: {
        type: String,
        default: '',
        trim: true
    },
    indikator: {
        type: String,
        default: '',
        trim: true
    },
    tampilkan: {
        type: Boolean,
        default: false,
        trim: true
    },
    _kegiatan: [{
        type: Schema.ObjectId,
        ref: 'Kegiatan'
    }]
});

module.exports = mongoose.model('Program', ProgramSchema, 'program');