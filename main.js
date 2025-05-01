const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
const config = require('./config.json');

const ffmpeg = require('ffmpeg-static');
process.env.FFMPEG_PATH = require('ffmpeg-static');
console.log("FFmpeg path:", ffmpeg);

const { DisTube } = require('distube');
const SpotifyWebApi = require('spotify-web-api-node');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { DirectLinkPlugin } = require('@distube/direct-link');
const { SpotifyPlugin } = require('@distube/spotify');
const ytdlp = require('yt-dlp-exec');
const { MongoClient, ServerApiVersion } = require('mongodb');

const fs = require("fs");

/*  I N S T A N C I A T I O N   C L I E N T  */


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


/*  I N S T A N C I A T I O N   S E R V I C E   D I S T U B E  */


const spotifyApi = new SpotifyWebApi({
    clientId: config.spotify_client_id,   
    clientSecret: config.spotify_client_secret,
    redirectUri: 'http://localhost:8888/callback'
});

function setupMusicEvents() {
    client.distube.on("addSong", (queue, song) => require('./eventsvoice/addSong.js')(queue, song))
    client.distube.on("playSong", (queue, song) => require('./eventsvoice/playSong.js')(queue, song))
    client.distube.on("error", (error, queue) => {
        console.log(error)
        console.table(error)
        console.log(typeof(error))
        if (error.errorCode.includes("FFMPEG")) {
            queue.textChannel.send("Erreur d'audio : ytb, sdc, ou spotify ont changé leur encodage (des fdp quoi)");
        }
    });
}

async function startMusicBot() {
    try {

        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body['access_token']);

        client.distube = new DisTube(client, {
            plugins: [
                new SpotifyPlugin({
                    api: spotifyApi
                }),
                new DirectLinkPlugin(),
                new YtDlpPlugin({
                    update: true,
                    ytSearchOptions: {
                        type: 'video',
                        safeSearch: 'strict'
                    }
                })
            ]
        });

        if(client.distube) {
            setupMusicEvents();
            await client.login(config.token);
        } else {
            throw "erreur";
        }
    } catch (err) {
        console.error("Erreur instanciation distube :", err);
    }
}


/*  S E R V E U R   M O N G O D B  */
/*

const mongoClient = new MongoClient(config.url_mongo, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await mongoClient.connect();
    await mongoClient.db("admin").command({ ping: 1 }); 
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await mongoClient.close();
  }
}

*/

/*  S E P A R A T I O N  D U   C O D E   E N   F I C H I E R S  */


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


/*  G E S T I O N   E V E N E M E N T S  */


client.on("ready", () => {
    client.user.setStatus('idle');
    client.user.setActivity({
        name: config.prefix +'help',
        type: ActivityType.Watching
    });
    console.log("Discord bot " + client.user.tag + " ready");
    if (client.distube)
        console.log("Plugins distube chargés :", client.distube.options.plugins.map(p => p.constructor.name));
});

client.on("messageCreate", message => {
    if(message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = client.commands.get(commandName) || client.commandsvoice.get(commandName);
        if(!command) return;
        command.run(client, message, args);
    }
});

client.on("guildMemberAdd", member => {
    require('./events/guildMemberAdd.js')(member, mongoClient)
})

client.on("guildMemberRemove", member => {
    require('./events/guildMemberRemove.js')(member, mongoClient)
})


/*  G E S T I O N   E V E N E M E N T S   V O C A U X  */

startMusicBot()

ytdlp('spooky scary skeletons', {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    preferFreeFormats: true,
    defaultSearch: 'ytsearch',
}).then(output => {
    console.log("Résultat yt-dlp :", output.title);
}).catch(err => {
    console.error("Erreur yt-dlp :", err);
});