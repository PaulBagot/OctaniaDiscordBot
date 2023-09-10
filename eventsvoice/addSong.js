const { EmbedBuilder } = require("@discordjs/builders");

module.exports = (queue, song) => {
    let embed = new EmbedBuilder();
    embed.setDescription(`Ajouter à la queue \`${song.name}\``);
    embed.setFooter(
        {text: 'demandé par ' + song.user.tag}
    );
    embed.setColor(0x8DCEF4);
    embed.setTimestamp();
    
    queue.textChannel.send({embeds : [embed]});
}