'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var KegiatanSchema = new Schema({
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
    k5: {
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
    lokasi: {
        type: String,
        default: '',
        trim: true
    },
    sasaran: {
        type: String,
        default: '',
        trim: true
    },
    satuan: {
        type: String,
        default: '',
        trim: true
    },
    harga: {
        type: Number,
        default: '',
        trim: true
    },
    dana: {
        type: String,
        default: '',
        trim: true
    },
    pelaksana: {
        type: String,
        default: '',
        trim: true
    },
    _program: {
        type: Schema.ObjectId,
        ref: 'Program',
        childPath: '_kegiatan'
    }
});

KegiatanSchema.plugin(relationship, {
    relationshipPathName: '_program'
});

module.exports = mongoose.model('Kegiatan', KegiatanSchema, 'kegiatan');