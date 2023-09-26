const { Client, Collection } = require('discord.js');
const { Colors, BetterConsoleLogger } = require('discord.js-v14-helper');
const chalk = require('chalk');
const fs = require('fs');
const config = require('./config/main');

const client = new Client(config.client.constructor);

client.commands = new Collection();
client.interactions = new Collection();
client.user_commands = new Collection();

module.exports = client;

console.log(chalk.hex('#EDE9C6')
    `                                      ▄▄                                                ▄▄▄▄
        ▀███▀▀▀██▄                    ██                 ██      ▀████▀                ▄█▀▀▀
          ██   ▀██▄                                      ██        ██                  ██▀   
          ██   ▄██▀███▄███  ▄██▀██▄ ▀███  ▄▄█▀██ ▄██▀████████      ██     ▀███  ▀███  █████  
          ███████   ██▀ ▀▀ ██▀   ▀██  ██ ▄█▀   ███▀  ██  ██        ██       ██    ██   ██    
          ██        ██     ██     ██  ██ ██▀▀▀▀▀▀█       ██        ██     ▄ ██    ██   ██    
          ██        ██     ██▄   ▄██  ██ ██▄    ▄█▄    ▄ ██        ██    ▄█ ██    ██   ██    
        ▄████▄    ▄████▄    ▀█████▀   ██  ▀█████▀█████▀  ▀████   ██████████ ▀████▀███▄████▄  
                                   ██ ██                                                     
                                   ▀███                                                      
        `
)
fs.readdirSync('./src/handlers').forEach((handler) => {
    console.log(chalk.hex('#FFB300')`[INFO] Handler loaded: ${handler}`)

    require('./handlers/' + handler)(client, config);
});

require('./error/main')();

const AuthenticationToken = process.env.TOKEN || config.luf.token;
if (!AuthenticationToken) {
    console.warn(chalk.hex('#A90000')`[CRASH] Authentication Token for Discord bot is required! Use Envrionment Secrets or main.js.`)
    process.exit();
};

client.login(AuthenticationToken)
    .catch((err) => {
        console.error(chalk.hex('#A90000')`[CRASH] Something went wrong while connecting to your bot...`);
        console.error(chalk.hex('#A90000')`[CRASH] Error from Discord API: ${err}`);
        process.exit();
    });