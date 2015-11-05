/**
 * Dana model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Dana = require('./dana.model');
var DanaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DanaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Dana.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DanaEvents.emit(event + ':' + doc._id, doc);
    DanaEvents.emit(event, doc);
  }
}

module.exports = DanaEvents;
