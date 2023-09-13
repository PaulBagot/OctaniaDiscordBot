const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let queue = client.distube.getQueue(message.guild);
    if(queue == null) return;
    if(queue.songs[0] == null) return;
    let song = queue.songs[0];
    let secondes = Number.parseInt(queue.currentTime % 60);
    
    let minutes = Number.parseInt((queue.currentTime - secondes) / 60);

    let minutesDisplay = minutes < 10 ? '0' + minutes.toString() : minutes;
    let secondesDisplay = secondes < 10 ? '0' + secondes.toString() : secondes;

    let embed = new EmbedBuilder();
    embed.setTitle("En train de jouer");
    embed.addFields(
        {name:'Nom:' , value: song.name},
        {name: 'Durée:', value: song.formattedDuration},
        {name: 'Temps écoulé:', value: minutesDisplay+':'+secondesDisplay}
    );
    embed.setFooter(
        {text: 'demandé par ' + song.user.tag}
    );
    embed.setColor(0x8DCEF4);
    embed.setTimestamp();
    message.channel.send({embeds : [embed]});
    message.delete();
}

exports.name = 'loop';