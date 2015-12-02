var tronapp = function(config) {
    var tron = require('../lib/tron.js');

    var self = this;

    /** reference to main window */
    this.mainWindow = null;

    /** configuration */
    this.config = new tron.config(config);

    /** reference to native Atom-Shell app instance */
    this.application = require('app');

    /**
     * start the app
     * @param {string|object} cfg
     */
    this.start = function() {
        var tron = require('../lib/tron.js');

        require('crash-reporter').start();

        this.application.on('window-all-closed', function() {
            self.application.quit();
        });

        if (this.application.isReady()) {
            self.spawnWindow();
        } else {
            self.application.on('ready', function() {
                self.spawnWindow();
            });
        }
    };

    /**
     * spawn the main application window
     */
    this.spawnWindow = function() {
        self.mainWindow = new tron.windows().create(self.config);

        self.mainWindow.on('closed', function () {
            self.mainWindow = null;
        });
    };

    this.start();
};

module.exports = tronapp;