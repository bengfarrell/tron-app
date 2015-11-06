var tronapp = function(config) {
    var self = this;

    /** reference to main window */
    this.mainWindow = null;

    /** reference to native Atom-Shell app instance */
    this.application = null;

    /**
     * start the app
     * @param {string|object} cfg
     */
    this.start = function(config) {
        var tron = require('../lib/tron.js');

        this.application = require('app');
        require('crash-reporter').start();

        this.application.on('window-all-closed', function() {
            self.application.quit();
        });

        this.application.on('ready', function() {
            var cfg = new tron.config(config);
            self.mainWindow = new tron.windows().create(cfg);

            self.mainWindow.on('closed', function () {
                self.mainWindow = null;
            });
        });
    };

    this.start(config);
};

module.exports = tronapp;