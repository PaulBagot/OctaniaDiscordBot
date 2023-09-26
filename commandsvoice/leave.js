exports.run = (client, message, args) => {
    client.distube.voices.leave(message.guild);
    message.channel.send(`:stop_button:  | son arrêté par \`${message.member.user.tag}\``);
    message.delete();
}

exports.name = 'leave';