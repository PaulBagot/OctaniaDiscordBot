const {
    Client,
    GatewayIntentBits,
    Collection,
    ActivityType
} = require("discord.js");
const config = require('./config.json');
const fs = require("fs");
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const guildMemberAdd = require("./events/guildMemberAdd.js");

const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.distube = new DisTube(client, {
    emitNewSongOnly : true,
    leaveOnFinish: false,
    plugins: [new SpotifyPlugin]
});

client.commands = new Collection();
const commandsDirectory = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
for(file of commandsDirectory) {
    const commandName = file.split(".")[0];
    const command = require(`./commands/${commandName}`);
    client.commands.set(commandName, command);
}

client.commandsvoice = new Collection();
const commandsVoiceDirectory = fs.readdirSync("./commandsvoice").filter(file => file.endsWith('.js'));
for(file of commandsVoiceDirectory) {
    const commandName = file.split(".")[0];
    const command = require(`./commandsvoice/${commandName}`);
    client.commandsvoice.set(commandName, command);
}

client.login(config.token);

client.on("ready", () => {
    client.user.setStatus('idle');
    client.user.setActivity({
        name: config.prefix +'help',
        type: ActivityType.Watching
    });
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

client.on("messageCreate", message => {
    if(message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = client.commandsvoice.get(commandName);
        if(!command) return;
        command.run(client, message, args);
    }
});

client.on("guildMemberAdd", member => {
    require('./events/guildMemberAdd.js')(member)
})

client.on("guildMemberRemove", member => {
    require('./events/guildMemberRemove.js')(member)
})

//events for voice channels
client.distube.on("addSong", (queue, song) => require('./eventsvoice/addSong.js')(queue, song));
client.distube.on("playSong", (queue, song) => require('./eventsvoice/playSong.js')(queue, song));