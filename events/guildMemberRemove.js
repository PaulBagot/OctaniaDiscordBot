const config = require('../config.json');
const mongoClient = require("mongodb")

module.exports = (member, mongoClient) => {
    async function run() {
        let channel;
        try {
            await mongoClient.connect();
            const dataBase = mongoClient.db("OctaniaBot")
            const collection = dataBase.collection("GuildsInfo");
            const findResult = await collection.find({guildId: {$eq: member.guild.id}});
            for await (const doc of findResult) {
                if(doc.eventChannelId != undefined)
                    channel = member.guild.channels.cache.get(doc.eventChannelId)
            }
            if(channel == null) {
                console.log(`event channel null from ${member.guild.name}`)
                return;
            }
            let number = member.guild.memberCount;
            channel.send(`Au revoir ${member.toString()} ! À bientôt peut être !`)
            channel.send(`Il reste ${number} membres sur ${member.guild.name} !`);
        } catch (e){
            console.log("error")
        } finally {
            await mongoClient.close();
        }
    }
    run().catch(console.dir);
}