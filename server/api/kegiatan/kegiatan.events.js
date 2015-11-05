/**
 * Kegiatan model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Kegiatan = require('./kegiatan.model');
var KegiatanEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
KegiatanEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Kegiatan.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    KegiatanEvents.emit(event + ':' + doc._id, doc);
    KegiatanEvents.emit(event, doc);
  }
}

module.exports = KegiatanEvents;
