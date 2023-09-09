exports.run = (client, message, args) => {
    client.distube.voices.leave(message.guild);
    message.channel.send("son arrété");
}

exports.name = 'leave';