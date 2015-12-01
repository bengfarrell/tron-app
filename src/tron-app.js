var tronapp = function(config) {
    var tron = require('../lib/tron.js');

    var self = this;

    /** reference to main window */
    this.mainWindow = null;

    /** reference to native Atom-Shell app instance */
    this.application = null;

    /** configuration */
    this.config = new tron.config(config);

    /**
     * start the app
     * @param {string|object} cfg
     */
    this.start = function() {
        var tron = require('../lib/tron.js');

        this.application = require('app');
        require('crash-reporter').start();

        this.application.on('window-all-closed', function() {
            self.application.quit();
        });

        this.application.on('ready', function() {
            self.mainWindow = new tron.windows().create(self.config);

            self.mainWindow.on('closed', function () {
                self.mainWindow = null;
            });
        });
    };

    this.start();
};

module.exports = tronapp;