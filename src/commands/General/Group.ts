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
        return void (await M.reply(`💮 *Title:* ${M.groupMetadata.subject}\n\n👑 *Created By:* ${
                M.groupOwner?.notify || M.groupOwner?.vname || M.groupOwner?.name || M.groupMetadata.groupOwner.split('@')[0]
            }\n\n🔊 *Announce:* ${
                M.groupMetadata.announce || false
            }\n\n🍀 *Restricted:* ${M.groupMetadata.restrict || M.groupMetadata.restrict || false}\n\n🏊 *Participants:* ${
                M.groupMetadata.participants.length
            }\n\n🏅 *Admins:* ${
                M.groupMetadata.participants.filter((participant: { isAdmin: unknown }) => participant.isAdmin).length
            }`))
        }
}       
