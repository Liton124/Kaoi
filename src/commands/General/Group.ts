import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'groupinfo',
            description: 'Deletes the quoted Message',
            aliases: ['group', 'grup'],
            category: 'general',
            usage: `${client.config.prefix}delete`,
            baseXp: 0
        })
    }
    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void (await M.reply(`💮 *Title:* ${metadata.subject}\n\n👑 *Created By:* ${
                owner?.notify || owner?.vname || owner?.name || metadata.owner.split('@')[0]
            }\n\n📅 *Created On:* ${moment(metadata.creation * 1000).format('DD/MM HH:mm:ss')}\n\n🔊 *Announce:* ${
                metadata.announce || false
            }\n\n🍀 *Restricted:* ${metadata.restrict || metadata.restrict || false}\n\n🏊 *Participants:* ${
                metadata.participants.length
            }\n\n🏅 *Admins:* ${
                metadata.participants.filter((participant: { isAdmin: unknown }) => participant.isAdmin).length
            }\n\n🎯 *Moderation:* ${mod}\n\n🔮 *Events:* ${events}\n\n🌟 *Safe:* ${safe}\n\n🔞 *NSFW:* ${NSFW}\n\n〽 *Description:* \n${
                metadata.desc}`))
        }
}       
