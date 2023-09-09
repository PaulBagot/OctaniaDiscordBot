exports.run = (client, message, args) => {
    if(args[0] == null) {
        message.reply("je n'ai rien à dire");
        return;
    }
    message.channel.send(args.join(' '));
    message.delete();
}

exports.name = "say";