import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            command: 'revoke',
            aliases: ['reset'],
            description: 'Revokes the group link.',
            category: 'moderation',
            usage: `${client.config.prefix}revoke`,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply("Make me admin first for use this command, Baka")
        await this.client.revokeInvite(M.from).catch(() => {
            return void M.reply('Failed to revoke the group link')
        })
        return void M.reply('Group link revoked')
    }
}
