import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'catfact',
            aliases: ['catfact'],
            description: 'Gives you a random cat fact',
            category: 'fun',
            usage: `${client.config.prefix}catfact`,
            baseXp: 10
        })
    }

        run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://some-random-api.ml/facts/cat`)
            .then((response) => {
                // console.log(response); 
                const text = `  🐱「 FACT 」🐱\n\n${response.data.fact}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
