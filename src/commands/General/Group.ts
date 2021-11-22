const owner = this.client.contacts[metadata.owner]
        return {
            body: icon ? await Utils.download(icon) : await readFile(join(this.client.assets, 'images', 'yui.jpg')),
            caption: `💮 *Title:* ${metadata.subject}\n\n👑 *Created By:* ${
                owner?.notify || owner?.vname || owner?.name || metadata.owner.split('@')[0]
            }\n\n📅 *Created On:* ${moment(metadata.creation * 1000).format('DD/MM HH:mm:ss')}\n\n🔊 *Announce:* ${
                metadata.announce || false
            }\n\n🍀 *Restricted:* ${metadata.restrict || metadata.restrict || false}\n\n🏊 *Participants:* ${
                metadata.participants.length
            }\n\n🏅 *Admins:* ${
                metadata.participants.filter((participant: { isAdmin: unknown }) => participant.isAdmin).length
            }\n\n🎯 *Moderation:* ${mod}\n\n🔮 *Events:* ${events}\n\n🌟 *Safe:* ${safe}\n\n🔞 *NSFW:* ${NSFW}\n\n〽 *Description:* \n${
                metadata.desc
