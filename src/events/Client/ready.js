const client = require('../../index');

module.exports = {
    event: 'ready',
    once: true,
    run: (client) => {
        console.log('> Logged in as ' + client.user.username + '.');
    }
};