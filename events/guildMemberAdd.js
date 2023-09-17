module.exports = (member) => {
    let channel = member.guild.channels.cache.get('1153071508114116618');
    if(channel == null) return;
    let number = member.guild.memberCount;
    channel.send(`Bienvenue  sur **${member.guild.name}** ${member.toString()} !`)
    channel.send(`Tu es notre ${number}ème membre !`);

}