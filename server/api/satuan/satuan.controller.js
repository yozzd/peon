/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/satuans              ->  index
 * POST    /api/satuans              ->  create
 * GET     /api/satuans/:id          ->  show
 * PUT     /api/satuans/:id          ->  update
 * DELETE  /api/satuans/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Satuan = require('./satuan.model');

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

// Gets a list of Satuans
exports.index = function (req, res) {
    Satuan.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Satuan from the DB
exports.show = function (req, res) {
    Satuan.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Satuan in the DB
exports.create = function (req, res) {
    Satuan.findOneAsync({
            satuan: req.body.satuan
        })
        .then(function (found) {
            if (found) {
                throw 'Satuan "' + found.satuan + '" sudah terdaftar di database'
            } else {
                var newSatuan = new Satuan({
                    satuan: req.body.satuan
                });
                return newSatuan.saveAsync()
                    .then(function (saved) {
                        return saved;
                    });
            }
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

// Updates an existing Satuan in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Satuan.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Satuan from the DB
exports.destroy = function (req, res) {
    Satuan.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};