const fs = require('fs');
const chalk = require('chalk');
const { REST, Routes } = require('discord.js');

module.exports = (client, config) => {
    let commands = [];

    fs.readdirSync('./src/commands/').forEach((dir) => {
        const files = fs.readdirSync('./src/commands/' + dir)
            .filter((file) => file.endsWith('.js'))

        for (let file of files) {
            let pulled = require('../commands/' + dir + '/' + file);

            if (pulled.command_data && typeof pulled.command_data === 'object') {
                console.log(chalk.yellow('Loaded application command: ' + file + '.'))

                commands.push(pulled.command_data);
                client.commands.set(pulled.command_data.name, pulled);
            } else {
                console.log(chalk.yellow('[WARN] Received empty property \'command_data\' invalid type (Object) in ' + file + '.'))

                continue;
            };
        };
    });

    const rest = new REST({ version: '10' }).setToken(config.luf.token);

    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(config.luf.id),
                { body: commands },
            );

            console.log(chalk.green(`Successfully reloaded ${data.length} application (/) commands.`));
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
};
