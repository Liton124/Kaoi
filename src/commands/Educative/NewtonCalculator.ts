import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType, Mimetype } from '@adiwajshing/baileys'


export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'newtoncalculator',
            aliases: ['ncal', 'newtoncal', 'ncalc', 'newtoncalc'],
            description: 'calculates the symbolic and arithmetic value. ',
            category: 'educative',
            usage: `${client.config.prefix}ncal [value]`,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Provide the arithmetic or symbolic value to calculate, Baka!')
        const value = joined.trim()
        await axios
            .get(`https://newton.now.sh/api/v2/factor/${value}`)
            .then((response) => {
                // console.log(response);
                const text = `「 NEWTONCALCULATOR 」\n\n📝 *Given Value:* ${value}\n\n💡 *Solution:* ${response.data.result}\n  `
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
