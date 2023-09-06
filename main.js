const {Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require('./config.json');
const fs = require("fs");
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

client.commands = new Collection();
const commandsDirectory = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
for(file of commandsDirectory) {
    const commandName = file.split(".")[0];
    const command = require(`./commands/${commandName}`);
    client.commands.set(commandName, command);
}

client.on("ready", () => {
    console.log("Discord bot " + client.user.tag + " ready");
});

client.on("messageCreate", message => {
    if(message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = client.commands.get(commandName);
        if(!command) return;
        command.run(client, message, args);
    }
});