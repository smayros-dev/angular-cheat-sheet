// Karma for browser-based IDEs (StackBlitz): there is no Chrome to launch, so
// Karma only serves on port 9876 and the IDE's preview tab is the captured
// browser. Jasmine results render in that tab and rerun on every save.
const base = require('./karma.conf.js');

module.exports = function (config) {
  base(config);
  config.set({
    browsers: [],
    listenAddress: '0.0.0.0',
    reporters: ['progress', 'kjhtml']
  });
};
