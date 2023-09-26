const fs = require('fs');
const chalk = require('chalk');

module.exports = (client) => {
    for (const dir of fs.readdirSync('./src/events/')) {
        for (const file of fs.readdirSync('./src/events/' + dir).filter((f) => f.endsWith('.js'))) {
            const module = require('../events/' + dir + '/' + file);

            if (!module) continue;

            if (!module.event || !module.run) {
                console.log(chalk.red('Unable to load the event ' + file + ' due to missing \'name\' or/and \'run\' properties.', 'warn'));

                continue;
            };

            console.log(chalk.green('Loaded new event: ' + file, 'info'));

            if (module.once) {
                client.once(module.event, (...args) => module.run(client, ...args));
            } else {
                client.on(module.event, (...args) => module.run(client, ...args));
            };
        };
    };
};