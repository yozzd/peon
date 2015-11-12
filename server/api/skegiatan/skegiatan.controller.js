/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/skegiatans              ->  index
 * POST    /api/skegiatans              ->  create
 * GET     /api/skegiatans/:id          ->  show
 * PUT     /api/skegiatans/:id          ->  update
 * DELETE  /api/skegiatans/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Skegiatan = require('./skegiatan.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Skegiatans
exports.index = function(req, res) {
  Skegiatan.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Skegiatan from the DB
exports.show = function(req, res) {
  Skegiatan.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Skegiatan in the DB
exports.create = function(req, res) {
  Skegiatan.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Skegiatan in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Skegiatan.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Skegiatan from the DB
exports.destroy = function(req, res) {
  Skegiatan.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
