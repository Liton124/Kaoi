import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'bot',
            description: 'Chat with the Bot in group',
            aliases: ['chat'],
            category: 'general',
            usage: `${client.config.prefix}bot (text)`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (this.client.config.chatBotUrl) {
            const myUrl = new URL(this.client.config.chatBotUrl)
            const params = myUrl.searchParams
            await axios
                .get(`http://api.brainshop.ai/get?bid=160532&key=KX96Q5LWl6lRPnrZ&uid=[uid]&msg=[msg]`)
                .then((res) => {
                    if (res.status !== 200) return void M.reply(`🔍 Error: ${res.status}`)
                    return void M.reply(res.data.cnt)
                })
                .catch(() => {
                    M.reply(`Intriguing...`)
                })
        } else {
            M.reply(`Chat Bot Url not set\nRefer to ${this.client.config.prefix}guide to get Chat Bot Url`)
        }
    }
}
