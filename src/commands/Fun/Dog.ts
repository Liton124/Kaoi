import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'dog',
            aliases: ['doggy'],
            description: 'Gives you dog fact',
            category: 'fun',
            usage: `${client.config.prefix}dog`,
            baseXp: 30
        })
    }

        run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://some-random-api.ml/animal/dog`)
            .then((response) => {
                // console.log(response); 
                const text = `*🐶Fact:* ${response.data.fact} `
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
