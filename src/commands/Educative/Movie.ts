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
            description: 'Gives you the info of the given movie name',
            category: 'educative',
            usage: `${client.config.prefix}movie`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Please provide me a movie name')
 
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
                    `Title: ${response.data.Title}\nYear: ${response.data.Year}\nRated: ${response.data.Rated}\nReleased: ${response.data.Released}\nRuntime: ${response.data.Runtime}\nGenre: ${response.data.Genre}\nDirector: ${response.data.Director}\nWriter: ${response.data.Writer}\nActors: ${response.data.Actors}\nPlot: ${response.data.Plot}\nLanguage: ${response.data.Language}\nCountry: ${response.data.Country}\nAwards: ${response.data.Awards}\nMetascore: ${response.data.Metascore}\nimdbRating: ${response.data.imdbRating}\nimdbVotes: ${response.data.imdbVotes}\nimdbID: ${response.data.imdbID}\nType: ${response.data.Type}\nDVD: ${response.data.DVD}\nBoxOffice: ${response.data.BoxOffice}\nProduction: ${response.data.Production}\nWebsite: ${response.data.Website}\nResponce: ${response.data.Responce} `
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
