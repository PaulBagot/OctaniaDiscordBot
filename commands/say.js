exports.run = (client, message, args) => {
    if(args[0] == null) {
        message.reply("je n'ai rien à dire");
        return;
    }
    let say = '';
    for(i in args)
        say += args[i] + ' ';
    message.channel.send(say);
    message.delete();
}

exports.name = "say";