var parse = require('co-body');
var route = require('koa-route');
var session = require('koa-session');
var koa = require('koa');

var sessions = require('./sessions');
var users = require('./users');

var app = module.exports = koa();

app.keys = ['secret'];
app.use(session())

function *signin() {
  var data = yield parse(this);
  try {
    var user = yield users.check(data.username, data.password);
    this.body = this.session.id = sessions.put(user.login);
  } catch (err) {
    this.throw(401, err);
  }
}

function *signup() {
  var data = yield parse(this);
  try {
    var user = yield users.create(data.username, data.password);
    this.body = this.session.id = sessions.put(user.login);
  } catch (err) {
    this.throw(400, err);
  }
}

function *signout() {
  var session = this.session.id;
  if (session) {
    sessions.signout(sessions.id(session));
  }

  this.session = null;
}

app.use(route.post('/signin', signin));
app.use(route.post('/signup', signup));
app.use(route.post('/signout', signout));
