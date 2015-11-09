/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/programs              ->  index
 * POST    /api/programs              ->  create
 * GET     /api/programs/:id          ->  show
 * PUT     /api/programs/:id          ->  update
 * DELETE  /api/programs/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Program = require('./program.model');
var Kegiatan = require('../kegiatan/kegiatan.model');

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

// Gets a list of Programs
exports.index = function (req, res) {
    Program.find().populate('_kegiatan').execAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Program from the DB
exports.show = function (req, res) {
    Program.findById(req.params.id).populate('_kegiatan').execAsync()
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Program in the DB
exports.create = function (req, res) {
    Program.findOneAsync({
            k4: req.body.k4
        })
        .then(function (found) {
            if (found) {
                throw 'Kode Program "' + found.k4 + '" dengan Uraian "' + found.uraian + '" sudah terdaftar di database'
            } else {
                var newProgram = new Program({
                    k1: req.body.k1,
                    k2: req.body.k2,
                    k3: req.body.k3,
                    k4: req.body.k4,
                    uraian: req.body.uraian,
                    indikator: req.body.indikator,
                    tampilkan: req.body.tampilkan
                });
                return newProgram.saveAsync()
                    .then(function (saved) {
                        return saved;
                    });
            }
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

// Updates an existing Program in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Program.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Program from the DB
exports.destroy = function (req, res) {
    Program.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(function (program) {
            _.each(program._kegiatan, function (value) {
                Kegiatan.findByIdAndRemoveAsync(value)
            })
            return program;
        })
        .then(removeEntity(res))
        .catch(handleError(res));
};