const fs = require('fs');

module.exports = (client, config) => {
    for (let file of fs.readdirSync('./src/interactions')) {
        let module = require('../interactions/' + file);

        if (module.customId && typeof module.customId === 'string') {
            client.interactions.set(module.customId, module);

            console.log('Loaded interactions: ' + file + '.')
        } else {
            console.log('[WARN] Received empty property \'customId\' or invalid type (String) in ' + file + '.')

            continue;
        };
    };
};