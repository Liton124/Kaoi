import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            aliases: ['add'],
            command: 'add',
            description: 'removes the mentioned users',
            category: 'moderation',
            usage: `${client.config.prefix}add [numbers in international format]`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply(`❌ Failed to ${this.config.command}, make me ADMIN first, baka`)
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length) return void M.reply(`Please enter the numbers you want to ${this.config.command}`)
        M.mentioned.forEach(async (user) => {
            .map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => [
              v,
              this.client.isOnWhatsApp(v + '@s.whatsapp.net')])     
            if (this.client.user.jid === user)
            let text += `User has added`
            await this.client.groupAdd(M.from, [user])   
        }
        await M.reply(`${text}`, undefined, undefined, [...M.mentioned, M.sender.jid])
    }
}
