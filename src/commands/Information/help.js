const { EmbedBuilder } = require('discord.js');

module.exports = {
    command_data: {
        name: 'help',
        description: 'Help command',
        type: 1,
        options: [],
    },
    role_perms: null,
    developers_only: false,
    cooldown: '10s',
    category: 'Information',
    run: async (client, interaction) => {
        await interaction.deferReply();

        const commandsFetched = await client.application.commands.fetch();

        const commands = [];

        commandsFetched.forEach((cmd) => {
            if (cmd.options?.length > 0) {
                for (let option of cmd.options) {
                    if (option.type !== 1) continue;

                    commands.push(`</${cmd.name} ${option.name}:${cmd.id}>`)
                };
            } else {
                commands.push(`</${cmd.name}:${cmd.id}>`);
            };
        });

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Help menu')
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setDescription(`Hello **${interaction.user.tag}**! Here are the list of my commands, click one of them to use:\n${commands.join(', ')}.`)
                    .setColor('Blurple')
            ]
        });

    }
};