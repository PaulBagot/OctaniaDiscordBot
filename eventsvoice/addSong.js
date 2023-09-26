const { EmbedBuilder } = require("@discordjs/builders");

module.exports = (queue, song) => { queue.textChannel.send(`:arrow_forward:  | \`${song.name}\` a été ajouté`) }