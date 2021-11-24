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
        return void (await M.reply(`💮 *Title:* ${groupMetadata.subject}\n\n👑 *Created By:* ${
                owner?.notify || groupOwner?.vname || groupOwner?.name || groupMetadata.groupOwner.split('@')[0]
            }\n\n📅 *Created On:* ${(groupMetadata.creation * 1000).format('DD/MM HH:mm:ss')}\n\n🔊 *Announce:* ${
                groupMetadata.announce || false
            }\n\n🍀 *Restricted:* ${groupMetadata.restrict || groupMetadata.restrict || false}\n\n🏊 *Participants:* ${
                groupMetadata.participants.length
            }\n\n🏅 *Admins:* ${
                groupMetadata.participants.filter((participant: { isAdmin: unknown }) => participant.isAdmin).length
            }`))
        }
}       
