var fs = require('fs');

var troncfg = function(cfg) {
  var self = this;

  /** app defaults */
  this.html = 'index.html';
  this.debug = false;
  this.frame = true;
  this.fullscreen = false;
  this.verbose = true;
  /*******************/

  this.options = { 'debug': { flags: [ 'd', 'debug', 'D'], type: 'boolean' },
    'html': { flags: ['html'], type: 'string' } };

  /**
   * apply args from CLI
   */
  this.load = function(cfg) {
    var props = null;
    if (cfg && typeof cfg === 'string') {
      props = JSON.parse(fs.readFileSync(cfg));
    } else if (cfg) {
      props = cfg;
    } else {
      props = {};
      process.argv.forEach(function (arg) {
        var key = arg.split(':')[0];
        var value = arg.split(':')[1];
        props[key] = value;
      });
    }

    Object.keys(props).forEach(function (key) {
      if (props[key] != "undefined" && props[key] != undefined && props[key]) {
        for (var c in self.options) {
          if (self.options[c].flags.indexOf(key) != -1) {
            if (self.options[c].type === 'boolean') {
              props[key] = self.argToBoolean(props[key]);
            }
            self[key] = props[key];
            console.log("Setting config." + key + " to " + props[key]);
          }
        }
      }
    });
  };

  /**
   * simple arg to boolean conversion
   * @param arg
   * @returns {boolean}
   */
  this.argToBoolean = function(arg) {
    if (typeof arg === 'boolean') { return arg; }
    return (arg == "true") ? true : false;
  };

  this.load(cfg);
};

module.exports = troncfg;
