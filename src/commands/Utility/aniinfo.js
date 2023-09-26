const { EmbedBuilder, ApplicationCommandOptionType, Embed } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    command_data: {
        name: 'anifo',
        description: 'Get character information',
        type: 1,
        options: [
            {
                name: 'character',
                description: 'name of the anime character (MUST BE A FULL NAME)',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ],
    },
    role_perms: null,
    developers_only: false,
    owner_only: false,
    cooldown: '5s',
    logger: true,
    category: 'Utility',
    run: async (client, interaction) => {
        try {
            // define an input
            const wik_char = interaction.options.getString("character");
            let aniChar = wik_char;

            // capitalize the first character of the input
            aniChar = capitalize(aniChar);

            // check if the input has spaces
            if (wik_char.includes(' ')) {
                // split the input by spaces, map each word to its capitalized form, join them back together, and replace spaces with underscores
                aniChar = aniChar.split(' ').map(capitalize).join(' ').replace(/ /g, '_');
            }
            // console.log(aniChar)
            const url = `https://characterprofile.fandom.com/wiki/${aniChar}`;

            axios.get(url).then(async response => {
                await interaction.deferReply()
                // Load the HTML content
                const $ = cheerio.load(response.data);
                // console.log($);
                if (!aniChar === "Monkey_D._Luffy") {
                    try {
                        // Extract character information
                        const name = $('.page-header__title').text();
                        const image = $('td.wikia-infobox-image > figure > a > img').attr('src');
                        const summary = $('.mw-parser-output > p').first().text();
                        const series = $('tr:has(th:contains("Series")) > td').text();
                        const sex = $('tr:has(th:contains("Sex")) > td').text();
                        const birthday = $('tr:has(th:contains("Birthday")) > td').text();
                        const height = $('tr:has(th:contains("Height")) > td').text();

                        // Create a Discord embed
                        const aniembed = new EmbedBuilder()
                            .setTitle(name)
                            .setURL(url)
                            .setDescription(summary)
                            .setImage(image)
                            .setColor(0x0099FF)
                            .addFields(
                                { name: "Series: ", value: series, inline: true },
                                { name: "Gender: ", value: sex, inline: true },
                                { name: "birthday: ", value: birthday, inline: true },
                                { name: "height: ", value: height, inline: true }
                            )

                        await interaction.editReply({ embeds: [aniembed] });
                    } catch (e) {
                        return await interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xe32424).setDescription('Character not found/available to be in here... I guess')] })
                    }
                } else if (aniChar === "Monkey_D._Luffy") {
                    // Extract character information
                    const name = $('.page-header__title').text();
                    const image = "https://i.imgur.com/ywG4LqT.png"
                    const summary = $('.mw-parser-output > p').first().text();
                    const series = $('tr:has(th:contains("Series")) > td').text();
                    const sex = $('tr:has(th:contains("Sex")) > td').text();
                    const birthday = $('tr:has(th:contains("Birthday")) > td').text();
                    const height = $('tr:has(th:contains("Height")) > td').text();

                    // Create a Discord embed
                    const aniembed = new EmbedBuilder()
                        .setTitle(name)
                        .setURL(url)
                        .setDescription(summary, image)
                        .setImage(image)
                        .setColor(0x0099FF)
                        .addFields(
                            { name: "Series: ", value: series, inline: true },
                            { name: "Gender: ", value: sex, inline: true },
                            { name: "birthday: ", value: birthday, inline: true },
                            { name: "height: ", value: height, inline: true },
                            { name: "Reputation: ", value: "The King Of The Pirates", inline: true }
                        )
                        .setFooter({ text: "👑 - The King Of The Pirates" })

                    await interaction.editReply({ embeds: [aniembed] });
                }
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

// define a function that capitalizes the first letter of a word
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}