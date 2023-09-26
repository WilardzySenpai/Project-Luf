const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    command_data: {
        name: 'owners',
        description: 'Show the bot owners',
        type: 1,
        options: [],
    },
    role_perms: null,
    developers_only: false,
    owner_only: true,
    cooldown: '5s',
    logger: true,
    category: '',
    run: async (client, interaction, config) => {
        try {
            await interaction.deferReply()

            const ownersID = config.users.owners;
            if (!ownersID) return;

            const ownersARRAY = [];

            ownersID.forEach(Owner => {
                const fetchedOWNER = interaction.guild.members.cache.get(Owner);
                if (!fetchedOWNER) ownersARRAY.push("*Unknown User#0000*");
                ownersARRAY.push(`${fetchedOWNER}`);
            });

            interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`**Only owners command!** \nOwners: **${ownersARRAY.join(", ")}**`)
                        .setColor("Yellow")
                ]
            });
        } catch (e) {
            console.log(e)
            const errorEmbed = new EmbedBuilder()
                .setTitle('An error occurred')
                .setDescription('```' + e + '```')
                .setColor(0xe32424);

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    }
};