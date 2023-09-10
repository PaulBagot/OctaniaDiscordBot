const { EmbedBuilder } = require("@discordjs/builders");

module.exports = (queue, song) => {
    
    let embed = new EmbedBuilder();
    embed.setTitle("En train de jouer");
    embed.addFields(
        {name: song.name, value: 'durée: ' + song.formattedDuration}
    );
    embed.setFooter(
        {text: 'demandé par ' + song.user.tag}
    );
    embed.setColor(0x8DCEF4);
    embed.setTimestamp();
    
    queue.textChannel.send({embeds : [embed]});
}