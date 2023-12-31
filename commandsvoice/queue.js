const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let queue = client.distube.getQueue(message.guild);
    if(queue != null) {
        if(queue.songs[1] != null) {
            let embed = new EmbedBuilder();
            let string = '';
            let number = 1;
            for(i in queue.songs) {
                string += number + `: \`${queue.songs[i].name}\`\n`;
                number++;
            }
            embed.setDescription(string);
            embed.setFooter(
                {text: 'demandé par ' + message.member.user.tag})
            embed.setColor(0x8DCEF4);
            embed.setTimestamp();
            message.channel.send({embeds : [embed]});
            message.delete();
            return;
        }
    }
    message.reply("il n'y a aucun son dans la queue");
}

exports.name = "queue";