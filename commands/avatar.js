const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let embed = new EmbedBuilder();
    embed.setColor(0x8DCEF4);
    embed.setTitle(`Icon du serveur ${message.guild.name}`);
    embed.setImage(message.guild.iconURL())
    embed.setTimestamp();
    embed.setFooter(
        {text: 'demandé par ' + message.author.tag}
    );

    message.channel.send({embeds : [embed]});
    message.delete();

}

exports.name = "avatar";