import OpenAI from "openai";
import dotenv from "dotenv";
import { Client, IntentsBitField, EmbedBuilder } from "discord.js";

/**
 * Initialize dotenv to access environment variables
 */
dotenv.config();

/** Set up client object */
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

/** Test that bot is successfully online */
client.on("ready", (c) => {
    console.log(`${c.user.tag} is ready.`);
});

/** Start running bot instance */
client.login(process.env.DISCORD_API_KEY);
