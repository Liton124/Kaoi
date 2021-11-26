import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'ncalculator',
            aliases: ['ncal', 'ncalculate'],
            description: 'Calculates the given value. ',
            category: 'educative',
            usage: `${client.config.prefix}ncal [value]`,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Provide the value to calculate, Baka!')
        const value = joined.trim()
        await axios
            .get(`https://newton.now.sh/api/v2/factor/${value}`)
            .then((response) => {
                // console.log(response);
                const text = `*Value:* ${value}, result: ${response.data.result} `
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
