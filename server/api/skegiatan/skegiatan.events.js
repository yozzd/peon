/**
 * Skegiatan model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Skegiatan = require('./skegiatan.model');
var SkegiatanEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SkegiatanEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Skegiatan.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SkegiatanEvents.emit(event + ':' + doc._id, doc);
    SkegiatanEvents.emit(event, doc);
  }
}

module.exports = SkegiatanEvents;
