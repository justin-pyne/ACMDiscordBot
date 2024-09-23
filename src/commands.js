import dotenv from "dotenv";
import { REST, Routes, SlashCommandBuilder } from "discord.js";

/** Define commands */
const commands = [
    new SlashCommandBuilder()
        .setName("ama")
        .setDescription("Ask me anything!")
        .addStringOption(option => option.setName("text")
                                        .setDescription("Body Text")
                                        .setRequired(true)),
    new SlashCommandBuilder()
        .setName("genImg")
        .setDescription("Generate an image given the prompt!")
        .addStringOption(option => option.setName("text")
                                        .setDescription("Body Text")
                                        .setRequired(true)),
]

/** Register the commands */
const rest = new REST().setToken(process.env.DISCORD_API_KEY);

(async () => {
    try{
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.SERVER_ID,
            ),
            { body : commands }
        );

        console.log("Commands registered successfully!");
    } catch (e) {
        console.log(`There was an error: ${e}`);
    }
})