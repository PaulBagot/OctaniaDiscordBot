const config = require('../config.json');

module.exports = (member, mongoClient) => {
    async function run() {
        let channel;
        let memberRole;
        try {
            await mongoClient.connect();
            const dataBase = mongoClient.db("OctaniaBot")
            const collection = dataBase.collection("GuildsInfo");
            const findResult = await collection.find({guildId: {$eq: member.guild.id}});
            for await (const doc of findResult) {
                if(doc.eventChannelId != undefined)
                    channel = member.guild.channels.cache.get(doc.eventChannelId)
                if(doc.memberRoleId != undefined)
                    memberRole = member.guild.roles.cache.get(doc.memberRoleId);
            }
            if(channel == null) {
                console.log(`event channel null from ${member.guild.name}`)
                return;
            }
            let number = member.guild.memberCount;
            channel.send(`Bienvenue  sur **${member.guild.name}** ${member.toString()} !`)
            channel.send(`Tu es notre ${number}ème membre !`);
            if(memberRole == null) {
                console.log(`member default role null from ${member.guild.name}`)
                return;
            }
            member.roles.add(memberRole)
        } catch (e){
            console.log("error")
        } finally {
            await mongoClient.close();
        }
    }
    run().catch(console.dir);

    
}