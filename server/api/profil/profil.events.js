/**
 * Profil model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Profil = require('./profil.model');
var ProfilEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProfilEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Profil.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProfilEvents.emit(event + ':' + doc._id, doc);
    ProfilEvents.emit(event, doc);
  }
}

module.exports = ProfilEvents;
