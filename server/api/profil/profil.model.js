'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');

var ProfilSchema = new Schema({
    tahun: {
        type: String,
        default: '',
        trim: true
    },
    skpd: {
        type: String,
        default: '',
        trim: true
    },
    alamat: {
        type: String,
        default: '',
        trim: true
    },
    map: {
        type: String,
        default: '',
        trim: true
    },
    telp: {
        type: String,
        default: '',
        trim: true
    },
    fax: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        default: '',
        trim: true
    },
    namakontak: {
        type: String,
        default: '',
        trim: true
    },
    telpkontak: {
        type: String,
        default: '',
        trim: true
    },
    namakepala: {
        type: String,
        default: '',
        trim: true
    },
    nipkepala: {
        type: String,
        default: '',
        trim: true
    },
    group: {
        type: String,
        default: '',
        trim: true
    },
    _user: {
        type: Schema.ObjectId,
        ref: 'User',
        childPath: '_profil'
    }
});

ProfilSchema.plugin(relationship, {
    relationshipPathName: '_user'
});

module.exports = mongoose.model('Profil', ProfilSchema, 'profil');