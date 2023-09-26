const { GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();

module.exports = {
    // Client configuration:
    client: {
        constructor: {
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.AutoModerationConfiguration,
                GatewayIntentBits.AutoModerationExecution,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User
            ],
            presence: {
                activities: [
                    {
                        name: 'Hello world!',
                        type: 0
                    }
                ],
                status: 'dnd'
            }
        }
    },

    // Bot info
    luf: {
        token: "MTEyMzExNDk5NjQ1NzU0OTk2Ng.GBBTjP.X4NTM2bKeCuFM_bn-G0Sq8I1-iXJGxEUrS-h2Q" || process.env.TOKEN,
        id: "1123114996457549966" || process.env.BOT_ID
    },

    // Database:
    database: {
        mongodb_uri: process.env.MONGO
    },

    // Users:
    users: {
        developers: ["939867069070065714"],
        owners: ["939867069070065714"]
    },

    channels: {
        logging_channel: "1123137929389293638" || process.env.LOGS
    }
};
