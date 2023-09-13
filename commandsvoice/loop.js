const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let queue = client.distube.getQueue(message.guild);
    if(queue == null) return;
    if(queue.songs[0] == null) return;
    let string = '';
    if(queue.repeatMode != 1) {
        string = `le son \`${queue.songs[0].name}\` est maintenant joué en boucle`;
        queue.repeatMode = 1;
    } else {
        string = 'les sons ne sont plus joué en boucle';
        queue.repeatMode = 0;
    }
    let embed = new EmbedBuilder();
    embed.setDescription(string);
    embed.setFooter(
        {text: 'demandé par ' + message.member.user.tag})
    embed.setColor(0x8DCEF4);
    embed.setTimestamp();
    message.channel.send({embeds : [embed]});
    message.delete();
}

exports.name = 'loop';