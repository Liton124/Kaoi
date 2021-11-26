import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'bored',
            description: 'random activity.',
            aliases: ['Be active'],
            category: 'fun',
            usage: `${client.config.prefix}bored`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://www.boredapi.com/api/activity`)
            .then((response) => {
                // console.log(response);
                const text = `🏋🏻 *Activity:* ${response.data.activity}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
