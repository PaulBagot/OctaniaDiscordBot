exports.run = (client, message, args) => {
    client.distube.voices.leave(message.guild);
    message.channel.send(`:stop_button:  | \`${message.member.user.tag}\` a arrété un son`);
    message.delete();
}

exports.name = 'leave';