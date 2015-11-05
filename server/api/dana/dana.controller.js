/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/danas              ->  index
 * POST    /api/danas              ->  create
 * GET     /api/danas/:id          ->  show
 * PUT     /api/danas/:id          ->  update
 * DELETE  /api/danas/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Dana = require('./dana.model');

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

// Gets a list of Danas
exports.index = function (req, res) {
    Dana.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Dana from the DB
exports.show = function (req, res) {
    Dana.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Dana in the DB
exports.create = function (req, res) {
    Dana.findOneAsync({
            dana: req.body.dana
        })
        .then(function (found) {
            if (found) {
                throw 'Sumber Dana "' + found.dana + '" sudah terdaftar di database'
            } else {
                var newDana = new Dana({
                    dana: req.body.dana
                });
                return newDana.saveAsync()
                    .then(function (saved) {
                        return saved;
                    });
            }
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

// Updates an existing Dana in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Dana.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Dana from the DB
exports.destroy = function (req, res) {
    Dana.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};