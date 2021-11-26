import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'uselessfact',
            aliases: ['uselessfact'],
            description: 'Gives you a useless but true fact.',
            category: 'fun',
            usage: `${client.config.prefix}uselessfact`,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://uselessfacts.jsph.pl/random.json?language=en`)
            .then((response) => {
                // console.log(response);
                const text = `*Advice for you ${M.sender.username}:* ${response.data.slip.advice}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
