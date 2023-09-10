const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let helpEmbed = new EmbedBuilder();
    helpEmbed.addFields(
        {name: 'ping', value: 'repond "pong !"'},
        {name: 'clear', value: 'efface le nombre de messages spécifier'},
        {name: 'say', value: 'répète ce que vous voulez lui faire dire'},
        {name: 'play', value: 'ajoute un son choisi à la queue'},
        {name: 'leave', value: 'déconnecte le bot du salon vocal'}
    );
    helpEmbed.setColor(0x8DCEF4);
    helpEmbed.setTitle("Liste des commandes");
    helpEmbed.setTimestamp();
    helpEmbed.setAuthor({name: 'Auteur : bclrr'});
    
    message.channel.send({embeds : [helpEmbed]});
}

exports.name = "help";