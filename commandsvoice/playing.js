const { EmbedBuilder } = require("@discordjs/builders");
const { RepeatMode } = require("distube");

exports.run = (client, message, args) => {
    let queue = client.distube.getQueue(message.guild);
    if(queue == null) return;
    if(queue.songs[0] == null) return;
    let song = queue.songs[0];
    let secondes = Number.parseInt(queue.currentTime % 60);
    let minutes = Number.parseInt((queue.currentTime - secondes) / 60);
    let minutesDisplay = minutes < 10 ? '0' + minutes.toString() : minutes;
    let secondesDisplay = secondes < 10 ? '0' + secondes.toString() : secondes;
    
    let loopMode = queue.repeatMode
    let loopModeDisplay = loopMode == 0 ? 'désactivé' : 'activé'


    message.channel.send({embeds : [
        new EmbedBuilder()
            .setAuthor({name: queue.textChannel.guild.name, iconURL: queue.textChannel.guild.iconURL()})
            .setDescription(`\`${song.name}\``)
            .setColor(0x32CD32)
            .setTitle("En train de jouer")
            .setThumbnail(song.thumbnail)
            .addFields(
                {name: 'Durée', value: `\`${song.formattedDuration}\``, inline: true},
                {name: 'Actuelle', value: `\`${minutesDisplay}:${secondesDisplay}\``, inline: true},
                {name: 'Position', value: '`1`', inline: true},
                {name: 'Demandeur', value: `\`${song.user.tag}\``, inline: true},
                {name: 'Lien', value: `[click](${song.url})`, inline: true},
                {name: 'Boucle', value: `\`${loopModeDisplay}\``, inline: true}
            )
            .setTimestamp()
    ]});
    message.delete();
}

exports.name = 'loop';