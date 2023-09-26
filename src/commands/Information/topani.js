const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationCommandOptionType } = require('discord.js');
const { scrapeTopAnime } = require('../../config/topPage');

module.exports = {
  command_data: {
    name: 'top',
    description: 'Give you the Top 10 Anime ',
    type: 1,
    options: [
      {
        name: 'page',
        description: 'Enter what page to see',
        type: ApplicationCommandOptionType.Number,
        required: false
      }
    ],
  },
  role_perms: null,
  developers_only: false,
  owner_only: false,
  cooldown: 5,
  logger: true,
  category: "Information",
  run: async (client, interaction) => {

    try {
      await interaction.deferReply()

      let page = interaction.options.getNumber("page") || 1;
      const topAnimeList = await scrapeTopAnime(page);

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('top_previous')
            .setLabel('Previous')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⬅️')
            .setDisabled(page == 1), // Disable the button if it's the first page
          new ButtonBuilder()
            .setCustomId('top_next')
            .setLabel('Next')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('➡️')
            .setDisabled(page == 5) // Disable the button if it's the last page
        );

      const topEmbed = new EmbedBuilder()
        .setTitle(`Top Anime (MAL) Page ${page}`)
        .setColor('#FF0000')
        .setDescription('Here are the top 10 anime:')

      topAnimeList.forEach((anime) => {
        topEmbed.addFields(
          { name: `${anime.rank}. ${anime.title}`, value: `Score: ${anime.score}`, inline: false }
        );
      });

      const message = await interaction.editReply({ embeds: [topEmbed], components: [row] });

      const collector = message.createMessageComponentCollector({
        filter: (b) => {
          if (b.user.id === interaction.user.id) return true;
          else {
            b.reply({ ephemeral: true, content: `Only **${interaction.user.username}** can use this button!` }); return false;
          };
        },
        time: 60000,
        idle: 60000 / 2
      }); // Collect for 60 seconds

      collector.on('collect', async (b) => {
        if (!b.deferred) await b.deferUpdate()
        
        console.log('Embed Title:', b.message.embeds[0].title); // Output the full embed title
        let titleParts = b.message.embeds[0].title.split(' ');
        let currentPage = parseInt(titleParts[titleParts.length - 1]);
        console.log('currentPage:', currentPage);

        let newPage;

        if (b.customId === 'top_previous') {
          newPage = currentPage - 1;
          // console.log(`Previous button clicked, new page is ${newPage}`);
        } else if (b.customId === 'top_next') {
          newPage = currentPage + 1;
          // console.log(`Next button clicked, new page is ${newPage}`);
        }

        const topAnimeList = await scrapeTopAnime(newPage);
        // console.log(`Scraped ${topAnimeList.length} anime from page ${newPage}`);
        const topEmbed = new EmbedBuilder()
          .setTitle(`Top Anime (MAL) Page ${newPage}`)
          .setColor('#FF0000')
          .setDescription('Here are the top 10 anime:');

        topAnimeList.forEach((anime) => {
          topEmbed.addFields(
            { name: `${anime.rank}. ${anime.title}`, value: `Score: ${anime.score}`, inline: false }
          );
        });

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('top_previous')
              .setLabel('Previous')
              .setStyle(ButtonStyle.Primary)
              .setEmoji('⬅️')
              .setDisabled(newPage == 1),
            new ButtonBuilder()
              .setCustomId('top_next')
              .setLabel('Next')
              .setStyle(ButtonStyle.Primary)
              .setEmoji('➡️')
              .setDisabled(newPage == 5)
          );

        // Update the message with the new embed and action row
        await message.edit({ embeds: [topEmbed], components: [row] });
      });
      collector.on('end', collected => {
        console.log(`Collected ${collected.size} interactions`);
        // 
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