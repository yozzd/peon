'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SprogramSchema = new Schema({
    no: {
        type: String,
        default: '',
        trim: true
    },
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
    pelaksana: {
        type: String,
        default: false,
        trim: true
    },
    skpd: {
        type: String,
        default: false,
        trim: true
    },
    tahun: {
        type: String,
        default: false,
        trim: true
    },
    _skegiatan: [{
        type: Schema.ObjectId,
        ref: 'Skegiatan'
    }]
});

module.exports = mongoose.model('Sprogram', SprogramSchema, 'sprogram');