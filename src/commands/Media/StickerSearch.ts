import { MessageType, Mimetype } from '@adiwajshing/baileys'
import request from '../../lib/request'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import { Sticker, Categories, StickerTypes } from 'wa-sticker-formatter'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'stickersearch',
            aliases: ['ssearch', 'ssch', 'ssh'],
            description: 'Search sticker. ',
            category: 'media',
            dm: true,
            usage: `${client.config.prefix}stickerserach [keywords]`
        })
    }
    // static count = 0
    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        
        if (!joined) return void M.reply('Provide the keywords you wanna search, Baka!')
        const cara = joined.trim()
        console.log(cara)
        
        const { data } = await axios.get(`https://api.mojilala.com/v1/stickers/search?q=${cara}&api_key=dc6zaTOxFJmzC`)
        
if ((data as { error: string }).error) return void (await M.reply('Sorry, couldn\'t find'))
        const i = Math.floor(Math.random() * data.data[0].id.images.fixed_height.length)
const b = `${data.data[0].id.images.fixed_height[i].url}`

        const sticker: any = await new Sticker(b, {
			pack: "sticker",
			author: "BY Kaoi",
			quality: 90,
			type: "full",
			categories: ["🎊"],
		});

      await M.reply(
			await sticker.build(),
			MessageType.sticker,
			Mimetype.webp,)
}





}
