import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'igstalk',
            aliases: ['ig'],
            description: 'Gives you random advice.\nDisclaimer: We do not hold responsibility of consequences of your actions based on the advice.',
            category: 'media',
            usage: `${client.config.prefix}advice`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://www.instagram.com/${target}/?__a=1`, {
                headers: {
                    accept:
                          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                          'accept-encoding': 'gzip, deflate, br',
                          'accept-language': 'en-US,en;q=0.9,id;q=0.8',
                          'cache-control': 'max-age=0',
                          'upgrade-insecure-requests': '1',
                          cookie: igCookie,
                          'user-agent':
                          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
                    };
                })
                .then(({data}) => {
                     const main = data.graphql.user;
                     return void (await M.reply({
                                  username: main.username,
                                  fullname: main.full_name,
                                  biography: main.biography,
                                  private: main.is_private,
                                  imageurl: main.profile_pic_url_hd,
                                  followers: main.edge_followed_by.count,
                                  followed: main.edge_follow.count,
                                  post: main.edge_owner_to_timeline_media.count,
                                  highlight: main.highlight_reel_count,
                     });
                }
       
        }
    }
}
