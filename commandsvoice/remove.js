const { EmbedBuilder } = require("@discordjs/builders");

exports.run = (client, message, args) => {
    let Args = args.join(' ')
    let index = Number.parseInt(Args) - 1
    let queue = client.distube.getQueue(message.guild)

    if(!Number.isInteger(index)) return
    if(queue == null) return 
    if(queue.songs[index] == null) return
    if(index <= 0) return

    queue.songs.splice(index, 1)
    message.channel.send(`:white_check_mark:  | \`${queue.songs[index].name}\` a été enlevé`)
    message.delete()
}

exports.name = 'remove';