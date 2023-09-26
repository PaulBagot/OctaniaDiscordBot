const { EmbedBuilder } = require("@discordjs/builders");

module.exports = (queue, song) => {

    queue.textChannel.send({ embeds : [
        new EmbedBuilder()
            .setAuthor({name: queue.textChannel.guild.name, iconURL: queue.textChannel.guild.iconURL()})
            .setDescription(`\`${song.name}\``)
            .setColor(0x32CD32)
            .setTitle("En train de jouer")
            .addFields(
                {name: 'Durée', value: `\`${song.formattedDuration}\``, inline: true},
                {name: 'Position', value: '`0`', inline: true})
            .setFooter({text: 'demandé par ' + song.user.tag})
            .setTimestamp()
    ]})
}