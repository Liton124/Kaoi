import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import yts from 'yt-search'
import YT from '../../lib/YT'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'image',
            description: 'search image frm google',
            category: 'media',
            aliases: ['gimage'],
            usage: `${client.config.prefix}image [term]`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
       const googleImage = require('g-i-s')
        if (!joined) return void M.reply('🔎 Provide a search term')
        const term = joined.trim()
var res = await googleImage(term, google)
function google(error, result){
if (error){ return M.reply('_[ ! ] Error')}
else {
var gugIm = result
var random =  gugIm[Math.floor(Math.random() * gugIm.length)].url
        this.client
            .sendMessage(M.from,random, MessageType.image, {quoted: M.WAMessage})
}
}
            .catch((reason: Error) => M.reply(`❌ an error occupered, Reason: ${reason}`))
    }
    }
