exports.run = (client, message, args) => {

    let Args = args.join(' ');
    let voiceChannel = message.member.voice.channel;
    if(!voiceChannel) {
        message.reply("vous n'êtes pas connecté");
        return;
    }
    if(!Args) {
        message.reply("vous n'avez rien demandé à jouer");
        return;
    }

    async function searchSong() {
        await client.distube.search(Args, {safeSearch : true})
        .then((tab) => {
            client.distube.play(voiceChannel, tab[0], {
                member: message.member,
                position: 0,
                textChannel: message.channel,
            });
            message.delete();
        })
        .catch((err) => message.channel.send("aucun son trouvé"))
    }
    searchSong()
}

exports.name = "play";