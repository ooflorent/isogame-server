var config = require('./lib/config');
var server = require('./lib/server');
// var socket = require('./lib/socket')(server);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(config.server.port);
}
