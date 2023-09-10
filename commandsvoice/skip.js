const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let queue = client.distube.getQueue(message.guild);
    if(queue == null) return;

    let embed = new EmbedBuilder();

    if(queue.songs[1] == null) {
        embed.setDescription(`pas de son après \`${queue.songs[0].name}\``);
        embed.setFooter(
            {text: 'demandé par ' + message.member.user.tag}
        );
        embed.setColor(0x8DCEF4);
        embed.setTimestamp();

    } else {
        let currentSong = queue.songs[0];

        embed.setDescription(`Sauter \`${currentSong.name}\``);
        embed.setFooter(
            {text: 'demandé par ' + message.member.user.tag}
        );
        embed.setColor(0x8DCEF4);
        embed.setTimestamp();

        queue.skip();
    }
    message.channel.send({embeds : [embed]});
    message.delete();
}

exports.name = "skip";