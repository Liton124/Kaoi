import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'meme',
            description: 'Will send you a Meme.',
            aliases: ['LOL'],
            category: 'fun',
            usage: `${client.config.prefix}meme`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const name = joined.trim()
        const { data } = await axios.get('https://imsea.herokuapp.com/api/1?q=${term}')
        const buffer = await request.buffer(data.image).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || 'Could not fetch image. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `Here you go ✨`,
                    undefined
                ).catch((e) => {
                    console.log(`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`)
                    // console.log('Failed')
                    M.reply(`Try again or use the link. Here's the URL: ${data.image}`)
                })
        
    }
}
