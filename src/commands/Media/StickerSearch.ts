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
        
        const { data } = await axios.get(`https://api.xteam.xyz/sticker/stickerly?q=${cara}&APIKEY=80ff35f542ee4149`)
        
if ((data as { error: string }).error) return void (await M.reply('Sorry, couldn\'t find'))
        const i = Math.floor(Math.random() * data.result.stickerlist.length)
const b = `${data.result.stickerlist[i]}`

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
