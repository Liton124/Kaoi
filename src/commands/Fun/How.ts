import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'how',
            description: 'Generally used to check if bot is Up',
            category: 'general',
            usage: `${client.config.prefix}hi`,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void (await M.reply(`how is ${M.mentioned[0]}\n\n${M.mentioned[0]}is ${Math.floor(Math.random() * 101)}%`))
    }
}
