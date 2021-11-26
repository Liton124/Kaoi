import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'gender',
            aliases: ['Gender'],
            description: 'I can tell your gender. ',
            category: 'misc',
            usage: `${client.config.prefix}gender [Your_name]`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Please provide me your name.')
        const place = joined.trim()
        await axios.get(`https://api.genderize.io/?name=${place}`)
/* Note
  If you want to add some response, we'd recommend you to explore the json itself which provided link returns.
  This stability of the url and API KEY is not guaranteed.
  Regards: Team Kaoi
 */
        .then((response) => {
                // console.log(response);
                const text = `🔎 Info for the name *${place}* found\n\n🍁 *Name:* ${response.data.name}\n*💫 Gender:* ${response.data.gender}\n`
                M.reply(text);
            }).catch(err => {
                M.reply(`Sorry, couldn't find any data related to *${place}*.`)
            }
            )
    };
}
