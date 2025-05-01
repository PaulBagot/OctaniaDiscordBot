exports.run = (client, message, args) => {

    if (!client.distube) {
        message.channel.send("Le robot est encore d'initialisation. Réessayez dans quelques secondes.");
        return;
    }

    if(!args.length) {
        message.reply("vous n'avez rien demandé à jouer");
        return;
    }

    const voiceChannel = message.member.voice.channel;
    if(!voiceChannel) {
        message.reply("vous n'êtes pas connecté");
        return;
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        message.reply("je n'ai pas les permissions nécessaires pour rejoindre ou parler dans ce canal vocal");
        return;
    }

    const query = args.join(' ');
    console.log(query);

    async function searchSong() {
        try {
            await message.delete();
            await client.distube.play(voiceChannel, query, {
                member: message.member,
                position: 0,
                textChannel: message.channel,
                metadata: {
                    requestedBy: message.author
                }
            });
        } catch (err) {
            console.log("Erreur recherhe du son :", err);
            message.channel.send(`Aucun son trouvé pour **${query}**. Essayez peut-être avec un autre mot-clé ou un lien direct.`);
        }
    } 
    searchSong()
}

exports.name = "play";