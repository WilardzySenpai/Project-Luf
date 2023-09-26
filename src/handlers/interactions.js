const fs = require('fs');
const { BetterConsoleLogger, Colors } = require('discord.js-v14-helper');

module.exports = (client, config) => {
    for (let file of fs.readdirSync('./src/interactions')) {
        let module = require('../interactions/' + file);

        if (module.customId && typeof module.customId === 'string') {
            client.interactions.set(module.customId, module);

            new BetterConsoleLogger('Loaded interactions: ' + file + '.')
                .setTextColor(Colors.Green)
                .log(true);
        } else {
            new BetterConsoleLogger('[WARN] Received empty property \'customId\' or invalid type (String) in ' + file + '.')
                .setTextColor(Colors.Red)
                .log(true);

            continue;
        };
    };
};