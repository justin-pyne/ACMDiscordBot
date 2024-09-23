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

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})


/** Test that bot is successfully online */
client.on("ready", (c) => {
    console.log(`${c.user.tag} is ready.`);
});

/** Function for generating text response */
async function generateMessage(textPrompt) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: 'system',
                content: 'You are a student answering your friend\'s question.',
            },
            {
                role: "user",
                content: textPrompt,   
            }
        ]
    });
    return response.choices[0].message;
}


/** add functionality -- We handle slash commands */
client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) return;
    if (interaction.channel.id !== process.env.CHANNEL_ID) return;

    if (interaction.commandName === "ama"){
        await interaction.deferReply();
        const prompt = interaction.options.get("text").value();

        try{
            // Get response
            response = await generateMessage(prompt);
            await interaction.editReply(response);
        } catch (e) {
            console.log(`Error occurred: ${e}`);
            return await interaction.editReply("IDK");
        }
    }
})

/** Start running bot instance */
client.login(process.env.DISCORD_API_KEY);
