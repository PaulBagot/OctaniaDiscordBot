exports.run = (client, message, args) => {

    let Args = args.join(' ');
    let voiceChannel = message.member.voice.channel;
    if(!voiceChannel)
        message.reply("vous n'êtes pas connecté");
    else if(!Args)
        message.reply("vous n'avez rien demandé à jouer");
    else {
        client.distube.play(voiceChannel, Args);
        message.channel.send("en train de jouer : \n" + Args);
        message.delete();
    }
}

exports.name = "play";