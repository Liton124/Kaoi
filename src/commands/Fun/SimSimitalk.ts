import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'simsimi',
            description: 'Chat with the Bot in group',
            aliases: ['simi'],
            category: 'fun',
            usage: `${client.config.prefix}bot (text)`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
                .get(`${encodeURI(https://api.simsimi.net/v2/?text=${M.args.slice(1)}&lc=en&cf=false`))
                .then((res) => {
                    if (res.status !== 200) return void M.reply(`🔍 Error: ${res.status}`)
                    return void M.reply(res.data.cnt)
                }
        }
}
