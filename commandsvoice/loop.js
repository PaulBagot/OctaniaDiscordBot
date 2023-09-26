const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let queue = client.distube.getQueue(message.guild);
    if(queue == null) return;
    if(queue.songs[0] == null) return;
    if(queue.repeatMode != 1) {
        message.channel.send(`:repeat_one:  | le son \`${queue.songs[0].name}\` est maintenant joué en boucle`)
        queue.repeatMode = 1;
    } else {
        message.channel.send('les sons ne sont plus joué en boucle')
        queue.repeatMode = 0;
    }
    message.delete();
}

exports.name = 'loop';