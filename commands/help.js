const { EmbedBuilder } = require("@discordjs/builders");
const { Embed } = require("discord.js");

exports.run = (client, message, args) => {
    let helpEmbed = new EmbedBuilder();
    helpEmbed.addFields(
        {name: 'ping', value: 'repond "pong !"'},
        {name: 'clear', value: 'efface le nombre de messages spécifier'}
    );
    helpEmbed.setColor(0x8DCEF4);
    helpEmbed.setTitle("Liste des commandes");
    helpEmbed.setTimestamp();
    helpEmbed.setAuthor({name: 'Bclrr'});
    
    message.channel.send({embeds : [helpEmbed]});
}

exports.name = "help";