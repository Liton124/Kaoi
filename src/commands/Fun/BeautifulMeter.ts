import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: "beautifulcheck",
            description: "Check anyone's beautifulness",
            category: "fun",
            aliases: ["beautifulmeter", "howbeautiful", "beautycheck"],
            usage: `${client.config.prefix}beautifulcheck [tag or quote] `,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        let text = '💅 _BEAUTIFULCHECK_ 💅 '
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length) return void M.reply(`Please tag *user* or *user message* for checking beautifulness`)
        M.mentioned.forEach(async (user) => {
            // const usr = this.client.contacts[user]
            // const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
       
            text += `_for_ *@${user.split('@')[0]}*\n\n*@${user.split('@')[0]}* _is_ *_${Math.floor(Math.random() * 101)}%_* _BEAUTIFUL_ 🌸🦋`             
        })
        await M.reply(`${text}`, undefined, undefined, [...M.mentioned, M.sender.jid])
    }
}
