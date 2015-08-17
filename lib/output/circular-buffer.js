'use strict';
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var DEFAULT_BUFFER_LENGTH = 1000;

function CircularBuffer(options) {
    EventEmitter.call(this);
    this.size = (options && options.size) || DEFAULT_BUFFER_LENGTH;
    this.events = new Array(this.size);
    this.next = 0;
    this.wrapped = false;
}
util.inherits(CircularBuffer, EventEmitter);
module.exports = CircularBuffer;

Object.defineProperty(CircularBuffer.prototype, 'length', {
    get: function () {
        return (this.wrapped ? this.size : this.next);
    }
});

CircularBuffer.prototype.log = function (event) {
    if (this.next >= this.size) {
        this.next = 0;
        this.wrapped = true;
    }
    this.events[this.next++] = event;
};

CircularBuffer.prototype.close = function () {
};

CircularBuffer.prototype.clear = function () {
    this.next = 0;
    this.wrapped = false;
};

CircularBuffer.prototype.getLastEvent = function () {
    var index = this.next || this.size;
    return this.events[index - 1];
};

CircularBuffer.prototype.getEvents = function () {
    var next = this.next;
    var events = this.events.slice(0, next);
    if (this.wrapped && (next < this.size)) {
        events = this.events.slice(next).concat(events);
    }
    return events;
};