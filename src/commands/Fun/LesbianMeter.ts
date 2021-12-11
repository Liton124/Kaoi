import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'lesbicheck',
            description: 'Generally used to check if bot is Up',
            category: 'general',
            aliases: ['lesbimeter', 'howlesbi', 'howlesbian', 'lesbiancheck'],
            usage: `${client.config.prefix}gaycheck [tag or quote] `,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        let text = '_LESBIANMETER_\n\n'
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length) return void M.reply(`Please tag *user* or *user message* for checking gayness`)
        M.mentioned.forEach(async (user) => {
            // const usr = this.client.contacts[user]
            // const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
       
            text += `LESBIAN CHECK for *@${user.split('@')[0]}*\n\n*@${user.split('@')[0]}* is *${Math.floor(Math.random() * 101)}%* _Gay_ 👽`             
        })
        await M.reply(`${text}`, undefined, undefined, [...M.mentioned, M.sender.jid])
    }
}
