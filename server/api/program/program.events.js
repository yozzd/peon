/**
 * Program model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Program = require('./program.model');
var ProgramEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProgramEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Program.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProgramEvents.emit(event + ':' + doc._id, doc);
    ProgramEvents.emit(event, doc);
  }
}

module.exports = ProgramEvents;
