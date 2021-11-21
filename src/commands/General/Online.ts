import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
        command: 'online',
            description: 'Deletes the quoted Message',
            aliases: ['on'],
            category: 'general',
            usage: `${client.config.prefix}online`,
            baseXp: 10
        })
    }
    run = async (M: ISimplifiedMessage): Promise<void> => {
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : M.chat
        let online = [...Object.keys(M.chats.get(id).presences), M.user.jid]
        M.reply(M.chat, 'List Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, M, {
        contextInfo: { mentionedJid: online }
     })
}
}
