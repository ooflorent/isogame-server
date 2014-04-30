var crypto = require('crypto');
var Emitter = require('events').EventEmitter;

function sessionid() {
  var sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
}

function SessionStore() {
  this.ids = {};
  this.sessions = {};
}

SessionStore.prototype.__proto__ = Emitter.prototype;

SessionStore.prototype.id = function(session) {
  return this.ids[session];
};

SessionStore.prototype.session = function(id) {
  return this.sessions[id];
};

SessionStore.prototype.put = function(id) {
  var session = this.session(id);
  if (session) {
    this.remove(id);
  }

  var session = sessionid();
  this.sessions[id] = session;
  this.ids[session] = id;
  return session;
};

SessionStore.prototype.remove = function(id, silent) {
  var session = this.session(id);
  if (session) {
    delete this.ids[session];
    delete this.sessions[id];
    if (!silent) {
      this.emit('remove', id, session);
    }
  }
};

module.exports = new SessionStore();
