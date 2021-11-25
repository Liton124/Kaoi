import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'dadjoke',
            aliases: ['djoke'],
            description: 'Gives you a dadjoke',
            category: 'fun',
            usage: `${client.config.prefix}dadjoke`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://icanhazdadjoke.com/slack`)
            .then((response.json()) => {
                // console.log(response);
                const text = `*dadjoke:* ${response.data.attachments[0].fallback}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
