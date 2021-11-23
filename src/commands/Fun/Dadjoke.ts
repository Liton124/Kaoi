import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'dadjoke',
            aliases:'djoke',
            description: 'Gives you random Dad Joke.',
            category: 'fun',
            usage: `${client.config.prefix}dadjoke`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://icanhazdadjoke.com/`)
            .then((response) => {
                // console.log(response);
                const id = `${response.data.id}`
                const joke = `${response.data.joke}`
                const status = `${response.data.status}`
            let text = M.reply(text);
        })
        .catch((err) => {
        M.reply(`🔍 Error: ${err}`)
          
    }
}
