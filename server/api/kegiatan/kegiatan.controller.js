/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/kegiatans              ->  index
 * POST    /api/kegiatans              ->  create
 * GET     /api/kegiatans/:id          ->  show
 * PUT     /api/kegiatans/:id          ->  update
 * DELETE  /api/kegiatans/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Kegiatan = require('./kegiatan.model');

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

// Gets a list of Kegiatans
exports.index = function (req, res) {
    Kegiatan.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Kegiatan from the DB
exports.show = function (req, res) {
    Kegiatan.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Kegiatan in the DB
exports.create = function (req, res) {
    Kegiatan.findOneAsync({
            k4: req.body.k4,
            k5: req.body.k5
        })
        .then(function (found) {
            if (found) {
                throw 'Kode Kegiatan "' + found.k5 + '" dengan Uraian "' + found.uraian + '" sudah terdaftar di database'
            } else {
                var newKegiatan = new Kegiatan({
                    k1: req.body.k1,
                    k2: req.body.k2,
                    k3: req.body.k3,
                    k4: req.body.k4,
                    k5: req.body.k5,
                    uraian: req.body.uraian,
                    indikator: req.body.indikator,
                    lokasi: req.body.lokasi,
                    sasaran: req.body.sasaran,
                    satuan: req.body.satuan,
                    harga: req.body.harga,
                    dana: req.body.dana,
                    pelaksana: req.body.pelaksana,
                    _program: req.body._program
                });
                return newKegiatan.saveAsync()
                    .then(function (saved) {
                        return saved;
                    });
            }
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

// Updates an existing Kegiatan in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Kegiatan.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Kegiatan from the DB
exports.destroy = function (req, res) {
    Kegiatan.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};