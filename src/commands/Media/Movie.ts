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
            command: 'movie',
            aliases: ['movieinfo'],
            description: 'Gives you the info of the given movie',
            category: 'media',
            usage: `${client.config.prefix}movie name`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Please provide me the name of the movie')
 
        const name = joined.trim()
        console.log(name)
        const { data } = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${name}`)
        if ((data as { error: string }).error) return void (await M.reply('Sorry, couldn\'t find'))
        const buffer = await request.buffer(data.Poster).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || '🌟 An error occurred. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `*Title:* ${data.Title}\n*Year:* ${data.Year}\n*Rated:* ${data.Rated}\n*Released in:* ${data.Released}\n*Runtime:* ${data.Runtime}\n*Genre:* ${data.Genre}\n*Director:* ${data.Director}\n*Writer:* ${data.Writer}\n\n*Actors:* ${data.Actors}\n\n*Plot:* ${data.Plot}\n\n*Language:* ${data.Language}\n*Country:* ${data.Country}\n*Awards:* ${data.Awards}\n*Metascore:* ${data.Metascore}\n*Imdb Rating:* ${data.imdbRating}\n*Imdb Votes:* ${data.imdbVotes}\n*Imdb ID:* ${data.imdbID}\n*Type:* ${data.Type}\n*DVD:* ${data.DVD}\n*Box Office:* ${data.BoxOffice}\n*Production:* ${data.Production}\n*Website:* ${data.Website}\n `,
                    undefined
                ).catch((e) => {
                    // console.log('Failed')
                    M.reply(`🌟An error occurred. Please try again later.`)
                })
                break
            } catch (e) {
                // console.log('Failed2')
                M.reply(`An error occurred. Please try again later.`)
            }
        }
        return void null
    }
}
