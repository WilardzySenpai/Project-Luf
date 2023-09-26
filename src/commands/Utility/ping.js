const ms = require('ms');

module.exports = {
    command_data: {
        name: 'ping',
        description: 'Replies with pong!',
        type: 1,
        options: [],
    },
    role_perms: null,
    developers_only: false,
    cooldown: '5s',
    category: 'Utility',
    run: async (client, interaction) => {
        const date = new Date().getTime();

        await interaction.deferReply();

        return interaction.editReply({
            content: `\`🏓\` Pong!\nClient latency: **${ms(date - interaction.createdTimestamp, { long: true })}**\nWebsocket latency: **${ms(client.ws.ping, { long: true })}**`
        });
    }
};