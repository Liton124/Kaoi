/** @format */

import { evaluate } from 'mathjs'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'calculator',
            aliases: ['calc', 'cal', 'calculate'],
            description: 'Calculates the given value. ',
            category: 'educative',
            usage: `${client.config.prefix}calc [value]`,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Provide the value to calculate, Baka!')
        const value = joined.trim()
        const calc = evaluate(value);
				const text = ` 「 CALCULATOR 」\n\n 📝 *${value}* *=* *${calc}*\n  `;
        await M.reply(text)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((reason: any) => M.reply(`${reason}`))
    }
}
