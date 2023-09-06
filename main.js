const {Client, GatewayIntentBits } = require("discord.js");
const config = require('./config.json');
const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ]
});

client.login(config.token);

client.on("ready", () => {
    console.log("Discord bot " + client.user.tag + " ready");
});