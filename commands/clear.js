exports.run = (client, message, args) => {
    if(!message.member.permissions.has("ManageChannels")) return;
    let error = false;
    if(args[0] != null){
        try {
            let messageNumber = Number.parseInt(args[0]);
            if(Number.isInteger(messageNumber)){
                message.channel.bulkDelete(messageNumber, true);
                message.channel.send("j'ai supprimé \`" + messageNumber + '\` message(s)');
                setTimeout(() => {
                    message.channel.bulkDelete(1, true);
                }, 2000);
                return;
            }
        }catch(e) {
            error = true;
        }
    } else
        error = true;
    if(error)
        message.reply('Il faut dire combien de messages tu veux supprimer !');
}

exports.name = "clear";