import { Event } from "../../structs/types/Event";
import { client } from "../../bot";
import { CommandInteractionOptionResolver } from "discord.js";

export default new Event({
    name: "interactionCreate",
    run(interaction) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command) return;

        const options = interaction.options as CommandInteractionOptionResolver;

        command.run({
            client,
            interaction,
            options
        });
    }
})