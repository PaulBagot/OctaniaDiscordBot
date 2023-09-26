const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let queue = client.distube.getQueue(message.guild);
    if(queue == null) return;
    if(queue.songs[1] != null) {
        embed.setDescription(`:fast_forward:  | \`${queue.songs[0].name}\` a été passé`);
        queue.skip();
    } else
        message.channel.send(`pas de son après \`${queue.songs[0].name}\``);
    message.delete();
}

exports.name = "skip";