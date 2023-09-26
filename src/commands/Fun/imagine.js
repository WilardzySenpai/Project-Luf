const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,  ApplicationCommandOptionType } = require('discord.js');
const models = require('../../config/models');

module.exports = {
    command_data: {
        name: 'imagine',
        description: 'Generate an image using a prompt.',
        type: 1,
        options: [
          {
            name: 'prompt',
            description: 'Enter your prompt',
            type: ApplicationCommandOptionType.String,
            required: true
          },
          {
            name: 'model',
            description: 'The image model',
            type: ApplicationCommandOptionType.String,
            choices: models,
            required: false
          }
        ],
    },
    role_perms: null,
    developers_only: false,
    owner_only: false,
    cooldown: 5,
    logger: true,
    category: "Fun",
    run: async (client, interaction) => {
      try {
        await interaction.deferReply();

        const { default: Replicate } = await import('replicate');

        const replicate = new Replicate({
          auth: "r8_4CPjfy5UwnlJ3l2lPui8RFdjR2bAXHS2u5yaZ" || process.env.REPLICATE_API_KEY,
        });

        const prompt = interaction.options.getString('prompt');
        const model = interaction.options.getString('model') || models[0].value;

        const output = await replicate.run(model, { input: { prompt } });

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel(`Download`)
            .setStyle(ButtonStyle.Link)
            .setURL(`${output[0]}`)
            .setEmoji('1101133529607327764')
        );

        const resultEmbed = new EmbedBuilder()
          .setTitle('Image Generated')
          .addFields({ name: 'Prompt', value: prompt })
          .setImage(output[0])
          .setColor('#44a3e3')
          .setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        });

        await interaction.editReply({
          embeds: [resultEmbed],
          components: [row],
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