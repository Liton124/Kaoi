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
        await axios
            .get(`http://www.omdbapi.com/?apikey=742b2d09&t=${name}`) 
            /* Note
  If you want to add some response, we'd recommend you to explore the json itself which provided link returns.
  This stability of the url and API KEY is not guaranteed.
  Regards: Team Kaoi
 */
            .then((response) => {
                // console.log(response);
  
                const text = `Title: ${response.data.Title}\nYear: ${response.data.Year}\nRated: ${response.data.Rated}\nReleased: ${response.data.Released}\nRuntime: ${response.data.Runtime}\nGenre: ${response.data.Genre}\nDirector: ${response.data.Director}\nWriter: ${responsible.data.Writer}\nActors: ${response.data.Actors}\nPlot: ${response.data.Plot}\nLanguage: ${response.data.Language}\nCountry: ${response.data.Country}\nAwards: ${response.data.Awards}\nPoster: ${response.data.Poster}\nMetascore: ${response.data.Metascore}\nimdbRating: ${response.data.imdbRating}\nimdbVotes: ${response.data.imdbVotes}\nimdbID: ${response.data.imdbID}\nType: ${response.data.Type}\nDVD: ${response.data.DVD}\nBoxOffice: ${response.data.BoxOffice}\nProduction: ${response.data.Production}\nWebsite: ${response.data.Website}\nResponce: ${response.data.Responce} `
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`Sorry, couldn't find any information.`)
            })
    }
