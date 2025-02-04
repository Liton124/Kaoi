import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'rules',
            description: `Get rules list`,
            aliases: ['rules'],
            category: 'general',
            usage: `${client.config.prefix}rules`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        // fetch result of https://waifu.pics/api/sfw/waifu from the API using axios
        return void M.reply( await request.buffer(`https://i.pinimg.com/564x/96/eb/e1/96ebe1427aa8505cf56b110a620503a3.jpg`),
        MessageType.image,
                    undefined,
                    undefined,
                    `_*----🎀[Rule]🎀----*_\n\n❌ *DONT ASK FOR THE SCRIPT* 🚫\n\n*--->*  If you want to chat with kaoi/bot you can use *!tada/ bot (your text)* both are different ai chat bots.\n\n*--->* If you want to add kaoi in your group, then contact with the owner by *!owner/ !mods*.\n\n*--->* Don't use wrong command, use the command given in the *help list*.\n\n*--->* Don't spam the bot with commands. if the bot is not responding, it means the bot maybe offline or facing internet issue.\n\n*--->* Don't DM the bot.\n\n*--->* Don't call the bot to avoid *blocking*.\n\n*IF YOU DON'T FOLLOW THE RULES THEN YOU WILL BE BAN SOON* 🚫  `,
                    undefined
                ).catch((reason: any) =>
            M.reply(`✖ An error occurred. Please try again later.`))
    }
}
