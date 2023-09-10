const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let Args = args.join(' ');
    let index = Number.parseInt(Args) - 1;
    let queue = client.distube.getQueue(message.guild);

    if(!Number.isInteger(index)) return;
    if(queue == null) return 
    if(queue.songs[index] == null) return;
    if(index <= 0) return;
    
    let embed = new EmbedBuilder();
    embed.setDescription(`\`${queue.songs[index].name}\` enlevé avec succès`);
    embed.setFooter(
        {text: 'demandé par ' + message.member.user.tag})
    embed.setColor(0x8DCEF4);
    embed.setTimestamp();
    queue.songs.splice(index, 1);
    message.channel.send({embeds : [embed]});
    message.delete();
}

exports.name = 'remove';