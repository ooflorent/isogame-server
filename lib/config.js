var path = require('path');
var data = require('../config.json');

data.paths.client = path.resolve(data.paths.client);
data.paths.maps = path.resolve(data.paths.maps);

module.exports = data;
