import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: "lesbicheck",
            description: "check anyone's lesbiness",
            category: "fun",
            aliases: ["lesbimeter", "howlesbi", "howlesbian", "lesbiancheck"],
            usage: `${client.config.prefix}lesbicheck [tag or quote] `,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        let text = '_LESBICHECK_ '
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length) return void M.reply(`Please tag *user* or *user message* for checking lesbiness`)
        M.mentioned.forEach(async (user) => {
            // const usr = this.client.contacts[user]
            // const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
       
            text += `_for_ *@${user.split('@')[0]}*\n\n*@${user.split('@')[0]}* _is_ *_${Math.floor(Math.random() * 101)}%_* _LESBIAN_ 👽`             
        })
        await M.reply(`${text}`, undefined, undefined, [...M.mentioned, M.sender.jid])
    }
}
