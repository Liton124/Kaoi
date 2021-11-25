import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: '',
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void (await M.reply(`𝙄𝙩'𝙨 𝙩𝙤𝙤 𝙦𝙪𝙞𝙚𝙩, *Do you mean* ${this.client.config.prefix}𝙝𝙚𝙡𝙥? \n`))
    }
}
