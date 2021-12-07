import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            aliases: ['boom', 'kickout'],
            command: 'remove',
            description: 'removes the mentioned users',
            category: 'moderation',
            usage: `${client.config.prefix}remove [@mention | tag]`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply(`How can I remove someone without being an admin?`)
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length) return void M.reply(`Tag the users you want to ${this.config.command}`)
        M.mentioned.forEach(async (user) => {
            // const usr = this.client.contacts[user]
            // const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
            if (M.groupMetadata?.owner.split('@')[0] === user.split('@')[0]) {
                let text = `✖ Skipped *@${user.split('@')[0]}* is owner, can't be removed, Baka!\n`
            }
            // check if user is Bot
            else if (this.client.user.jid === user) {
                let text = `✖ Skipped whom you trying to remove, *@${user.split('@')[0]}* is me, Baka!\n`
            } else {
                let text = `User has been removed 🌸`
                await this.client.groupRemove(M.from, [user])
            }
        })
        await M.reply(`${text}`, undefined, undefined, [...M.mentioned, M.sender.jid])
    }
}
