const { EmbedBuilder, PermissionsBitField, ContextMenuCommandBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    command_data: {
        name: "getInfo",
        type: 2
    },
    run: async (client, interaction) => {

        const user = interaction.guild.members.cache.get(interaction.targetId);

        const joinedAgoCalculator = {
            fetch: {
                user(userInput, type) {
                    if (!userInput) throw new ReferenceError('You didn\'t provided the user to calculate.');

                    if (type === "discord") {
                        const joinedDiscordTimestampInNumber = new Date().getTime() - userInput.createdTimestamp;
                        const joinedDiscordTimestampInString = moment(userInput.user.createdAt).fromNow();
                    } else if (type === "server") {
                        const joinedServerTimestampInNumber = new Date().getTime() - userInput.joinedTimestamp;
                        const joinedServerTimestampInString = moment(userInput.joinedAt).fromNow();

                        return joinedServerTimestampInString.toString();
                    } else throw new ReferenceError('Invalid type. Use "discord" or "server" only.');
                }
            }
        };

        const bot = {
            true: "Yes",
            false: "No"
        };

        const acknowledgements = {
            fetch: {
                user(userInput) {
                    let result;

                    try {
                        if (userInput.permissions.has(PermissionsBitField.ViewChannel)) result = "Server Member";
                        if (userInput.permissions.has(PermissionsBitField.KickMembers)) result = "Server Moderator";
                        if (userInput.permissions.has(PermissionsBitField.ManageServer)) result = "Server Manager";
                        if (userInput.permissions.has(PermissionsBitField.Administrator)) result = "Server Administrator";
                        if (userInput.id === interaction.guild.ownerId) result = "Server Owner";

                    } catch (e) {
                        result = "Server Member";
                    };

                    return result;
                }
            }
        };

        return interaction.reply(
            {
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${user.user.tag}'s information:`)
                        .setThumbnail(user.displayAvatarURL(
                            {
                                dynamic: true
                            }
                        ))
                        .addFields(
                            {
                                name: "Full name",
                                value: `${user.user.tag}`,
                                inline: true
                            },
                            {
                                name: "Identification",
                                value: `\`${user.id}\``,
                                inline: true
                            },
                            {
                                name: `Roles [${user.roles.cache.size - 1}]`, // Use "-1" because we removed the "@everyone" role 
                                value: `${user.roles.cache.map((ROLE) => ROLE).join(' ').replace('@everyone', '') || "[No Roles]"}`,
                                inline: true
                            },
                            {
                                name: "Joined server at",
                                value: `${new Date(user.joinedTimestamp).toLocaleString()}\n(${joinedAgoCalculator.fetch.user(user, "server")})`,
                                inline: true
                            },
                            {
                                name: "Joined Discord at",
                                value: `${new Date(user.user.createdTimestamp).toLocaleString()}\n(${joinedAgoCalculator.fetch.user(user, "discord")})`,
                                inline: true
                            },
                            {
                                name: "A Bot?",
                                value: `${bot[user.user.bot]}`,
                                inline: true
                            },
                            {
                                name: "Acknowledgements",
                                value: `${acknowledgements.fetch.user(user)}`
                            }
                        )
                        .setColor('Blue')
                ],
                ephemeral: true
            }
        )
    }
}