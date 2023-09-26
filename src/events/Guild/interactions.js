module.exports = {
    event: 'interactionCreate',
    run: async (client, interaction) => {
        if (interaction.isButton() || interaction.isStringSelectMenu() || interaction.isModalSubmit()) {
            const interactionModuleCustomId = await client.interactions.get(interaction.customId);
    
            if (!interactionModuleCustomId) return;
    
            interactionModuleCustomId.run(client, interaction);
        } else return;
    }
}