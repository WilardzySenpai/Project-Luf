const { MongoDBConnector } = require('discord.js-v14-helper');

module.exports = (client, config) => {
    if (require('../config/main').database && require('../config/main').database.mongodb_uri) {
        const connector = new MongoDBConnector(require('../config/main').database.mongodb_uri);

        connector.start();
    } else {
        console.warn('[WARN] The MongoDB URI couldn\'t be found, database is not connected.');
    };
};
