var heroes = {};

module.exports = {
  findByPlayer: function(login) {
    return function(done) {
      return heroes[login] || [];
    };
  },
  check: function(username, password) {
    return function(done) {
      if (!username) return done(new Error('Missing username'));
      if (!password) return done(new Error('Missing password'));

      var login = username.toLowerCase();
      var user = heroes[login];
      if (user && user.password === password) {
        done(null, user);
      } else {
        done(new Error('Invalid password'));
      }
    };
  },
  create: function(username, password) {
    return function(done) {
      if (!username) return done(new Error('Missing username'));
      if (!password) return done(new Error('Missing password'));
      if (username.length < 4) return done(new Error('username is too short'));
      if (password.length < 6) return done(new Error('password is too short'));

      var login = username.toLowerCase();
      if (heroes[login]) return done(new Error('username already exists'));

      var user = heroes[login] = {
        login: login,
        username: username,
        password: password
      };

      done(null, user);
    };
  }
};
