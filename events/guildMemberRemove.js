module.exports = (member) => {
    let channel = member.guild.channels.cache.get('1153071545757990952');
    if(channel == null) return;
    let number = member.guild.memberCount;
    channel.send(`Au revoir ${member.toString()} ! À bientôt peut être !`)
    channel.send(`Il reste ${number} membres sur ${member.guild.name} !`);

}