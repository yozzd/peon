/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sprograms              ->  index
 * POST    /api/sprograms              ->  create
 * GET     /api/sprograms/:id          ->  show
 * PUT     /api/sprograms/:id          ->  update
 * DELETE  /api/sprograms/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');
var Sprogram = require('./sprogram.model');
var Skegiatan = require('../skegiatan/skegiatan.model');
var Profil = require('../profil/profil.model');

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(function (updated) {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(function () {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Sprograms
exports.index = function (req, res) {
    Sprogram.find().populate('_skegiatan').execAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Sprogram from the DB
exports.show = function (req, res) {
    Sprogram.findById(req.params.id).populate('_skegiatan').execAsync()
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Sprogram in the DB
exports.create = function (req, res) {
    Sprogram.countAsync({
            pelaksana: req.user.name,
            tahun: moment().add(1, 'years').format('YYYY')
        })
        .then(function (count) {
            Sprogram.findOneAsync({
                    k4: req.body.program.k4,
                    pelaksana: req.user.name,
                    tahun: moment().add(1, 'years').format('YYYY')
                })
                .then(function (found) {
                    if (found) {
                        throw 'Kode Program "' + found.k4 + '" dengan Uraian "' + found.uraian + '" terdaftar dengan No. Proposal ' + found.no
                    } else {
                        return Profil.findByIdAsync(req.user._profil)
                            .then(function (profil) {
                                var c = count < 10 ? '0' + (count + 1) : count + 1
                                var newSprogram = new Sprogram({
                                    no: req.user.no + '' + req.body.program.k4 + '' + c + '/' + moment().format('DDMMYY'),
                                    k1: req.body.program.k1,
                                    k2: req.body.program.k2,
                                    k3: req.body.program.k3,
                                    k4: req.body.program.k4,
                                    uraian: req.body.program.uraian,
                                    indikator: req.body.program.indikator,
                                    tampilkan: req.body.program.tampilkan,
                                    pelaksana: req.user.name,
                                    skpd: profil.skpd,
                                    tahun: moment().add(1, 'years').format('YYYY')
                                });
                                return newSprogram.saveAsync()
                                    .then(function (saved) {
                                        return saved;
                                    });
                            })
                    }
                })
                .then(function (program) {
                    _.each(req.body.program._kegiatan, function (value) {
                        var newSkegiatan = new Skegiatan({
                            k1: value.k1,
                            k2: value.k2,
                            k3: value.k3,
                            k4: value.k4,
                            k5: value.k5,
                            uraian: value.uraian,
                            indikator: value.indikator,
                            lokasi: value.lokasi,
                            sasaran: value.sasaran,
                            satuan: value.satuan,
                            volume: value.volume,
                            harga: value.harga,
                            jumlah: value.volume * value.harga,
                            dana: value.dana,
                            pelaksana: value.pelaksana,
                            _sprogram: program[0]._id,
                        });
                        newSkegiatan.saveAsync()
                    })
                    return program;
                })
                .then(responseWithResult(res, 201))
                .catch(handleError(res));
        });
    /*Sprogram.findOneAsync({
            k4: req.body.program.k4,
            pelaksana: req.user.name
        })
        .then(function (found) {
            if (found) {
                throw 'Kode Program "' + found.k4 + '" dengan Uraian "' + found.uraian + '" terdaftar dengan No. Proposal ' + found.no
            } else {
                var newSprogram = new Sprogram({
                    no: req.user.no + '' + req.body.program.k4,
                    k1: req.body.program.k1,
                    k2: req.body.program.k2,
                    k3: req.body.program.k3,
                    k4: req.body.program.k4,
                    uraian: req.body.program.uraian,
                    indikator: req.body.program.indikator,
                    tampilkan: req.body.program.tampilkan,
                    pelaksana: req.user.name
                });
                return newSprogram.saveAsync()
                    .then(function (saved) {
                        return saved;
                    });
            }
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));*/
};

// Updates an existing Sprogram in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Sprogram.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(function (program) {
            _.each(req.body._skegiatan, function (value) {
                value.jumlah = value.volume * value.harga;
                Skegiatan.findByIdAsync(value._id)
                    .then(saveUpdates(value))
            })
            return program;
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Sprogram from the DB
exports.destroy = function (req, res) {
    Sprogram.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(function (program) {
            _.each(program._skegiatan, function (value) {
                Skegiatan.findByIdAndRemoveAsync(value)
            })
            return program;
        })
        .then(removeEntity(res))
        .catch(handleError(res));
};