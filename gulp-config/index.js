var pkg = require('../package.json');
var config = {
    clean: [ '.sonar', 'coverage', 'log/**/*' ],
    mocha: [ 'test/**/*.spec.js'],
    src: ['lib/**/*.js', 'index.js']
};

config.eslint = config.src.concat(config.mocha);

module.exports = config;
