const { EmbedBuilder } = require("@discordjs/builders");

module.exports = (queue, song) => { queue.textChannel.send(`:notes:  | \`${song.name}\` a été ajouté`) }