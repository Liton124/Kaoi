import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'changemind',
            description: `Change his mind`,
            aliases: ['mind', 'change'],
            category: 'fun',
            usage: `${client.config.prefix}mind words`,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        // consider neko and kitsune in furry
        
        const term = joined.trim()

        // fetch result of https://waifu.pics/api/sfw from the API using axios
        const { data } = await axios.get(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${term}`)
        const buffer = await request.buffer(data.message).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || 'Could not fetch image. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `😅 Change my Mind 😅\n`,
                    undefined
                ).catch((e) => {
                    console.log(`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`)
                    // console.log('Failed')
                    M.reply(`Could not fetch image. Here's the URL: ${data.url}`)
                })
                break
            } catch (e) {
                // console.log('Failed2')
                M.reply(`Could not fetch image. Here's the URL : ${data.url}`)
                console.log(`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`)
            }
        }
        return void null
    }
}
