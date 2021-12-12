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
                    `Title: ${data.Title}\nYear: ${data.Year}\nRated: ${data.Rated}\nReleased: ${data.Released}\nRuntime: ${data.Runtime}\nGenre: ${data.Genre}\nDirector: ${data.Director}\nWriter: ${data.Writer}\nActors: ${data.Actors}\nPlot: ${data.Plot}\nLanguage: ${data.Language}\nCountry: ${data.Country}\nAwards: ${data.Awards}\nMetascore: ${data.Metascore}\nimdbRating: ${data.imdbRating}\nimdbVotes: ${data.imdbVotes}\nimdbID: ${data.imdbID}\nType: ${data.Type}\nDVD: ${data.DVD}\nBoxOffice: ${data.BoxOffice}\nProduction: ${data.Production}\nWebsite: ${data.Website}\nResponce: ${data.Responce} `,
                    undefined
                ).catch((e) => {
                    console.log(`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`)
                    // console.log('Failed')
                    M.reply(`🌟An error occurred. Please try again later.`)
                })
                break
            } catch (e) {
                // console.log('Failed2')
                M.reply(`An error occurred. Please try again later.`)
                console.log(`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`)
            }
        }
        return void null
    }
}
