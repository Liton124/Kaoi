import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'gaycheck',
            description: 'Generally used to check if bot is Up',
            category: 'general',
            aliases: ['gaymeter', 'howgay'],
            usage: `${client.config.prefix}gaycheck [tag or quote] `,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length) return void M.reply(`Please tag the user for checking gayness`)
        M.mentioned.forEach(async (user) => {
            // usr = this.client.sender.contacts[user]
            // username = user.split('@')[0] 
          
       
            await M.reply(`How _Gay_ *${user.split('@')[0]}* ❓\n\n*${user.split('@')[0]}* is *${Math.floor(Math.random() * 101)}%* _Gay_ 👽`)              
        })
    }
}
