import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'timetable',
            description: 'Displays time table of S2 CS',
            aliases: ['tt', 'subjects'],
            category: 'general',
            usage: `${client.config.prefix}timetable`,
            adminOnly: true
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {

        var message = ""
        var day = M.args[1]

        // for(var i = 1; i < M.args.length; i++) {
        //     day = day + M.args[i];
        // }
        
        
        if(day == "monday" || day == "Monday") {
            message = "*8:30 - 9:20 : \n C Programming \n link: https://meet.google.com/yqn-ijpq-qtv \n\n *9:30 - 10:20 : \n Engineering Chemistry \n link: https://meet.google.com/yob-ztiq-yqe \n\n *10:30 - 11:20 : \n Engineering Chemistry \n link: https://meet.google.com/yob-ztiq-yqe\n\n *11:30 - 12:20 : \n Maths \n link: https://meet.google.com/gdz-rkfz-aam \n\n *12:30 - 1:20 : \n Engineering Graphics \n link: https://meet.google.com/gfk-pbor-mrq \n"
        } 
        else if (day == "tuesday" || day == "Tuesday") {
            message = "*8:30 - 9:20 : \n Maths \n link: https://meet.google.com/gdz-rkfz-aam \n\n *9:30 - 10:20 : \n Basics of Electronics \n link: https://meet.google.com/fko-pqor-sdy \n\n *10:30 - 11:20 : \n C Programming \n link: https://meet.google.com/yqn-ijpq-qtv \n\n *11:30 - 12:20 : \n Engineering Graphics \n link: https://meet.google.com/gfk-pbor-mrq \n\n *12:30 - 1:20 : \n Professional Communication \n link: http://meet.google.com/byt-pzzr-pyg \n"
        }
        else if (day == "wednesday" || day == "Wednesday") {
            message = "*8:30 - 9:20 : \n Engineering Graphics \n link: https://meet.google.com/gfk-pbor-mrq \n\n *9:30 - 10:20 : \n Basics of Electronics \n link: https://meet.google.com/fko-pqor-sdy \n\n *10:30 - 11:20 : \n C Programming \n link: https://meet.google.com/yqn-ijpq-qtv \n\n *11:30 - 12:20 : \n C Programming \n link: https://meet.google.com/yqn-ijpq-qtv \n\n *12:30 - 1:20 : \n Professional Communication \n link: http://meet.google.com/byt-pzzr-pyg \n"
        }
        else if (day == "thursday" || day == "Thursday") {
            message = "*8:30 - 9:20 : \n Electronics Workshop (Kuriyappy Sir) \n link: https://meet.google.com/hjm-wqmc-jdk \n\n *9:30 - 10:20 : \n Electronics Workshop \n link: https://meet.google.com/hjm-wqmc-jdk \n\n *10:30 - 11:20 : \n Basics of Electronics \n link: https://meet.google.com/fko-pqor-sdy \n\n *11:30 - 12:20 : \n Engineering Chemistry \n link: https://meet.google.com/yob-ztiq-yqe \n\n *12:30 - 1:20 : \n Maths \n link: https://meet.google.com/gdz-rkfz-aam \n"
        }
        else if (day == "friday" || day == "Friday") {
            message = "*8:30 - 9:10 : \n Maths \n link: https://meet.google.com/gdz-rkfz-aam \n\n *9:20 - 10:00 : \n Engineering Graphics \n link: https://meet.google.com/gfk-pbor-mrq \n\n *10:10 - 10:50 : \n Proffessional Communication \n link: http://meet.google.com/byt-pzzr-pyg \n\n *11:00 - 11:40 : \n Engineering Chemistry Lab \n link: https://meet.google.com/yob-ztiq-yqe \n\n *11:50 - 12:30 : \n Engineering Chemistry Lab \n link: https://meet.google.com/yob-ztiq-yqe \n"
        }
        else if (day == "sunday" || day == "Sunday") {
            message = "Go get some sleep"
        }
        else if (day == "saturday" || day == "Saturday") {
            message = "Go watch Movies"
        }
        else {
            message = "Go get some help and never come back!!!";
        }

        return void (await M.reply(
            message,
            undefined,
            undefined,
            [M.sender.jid],
        ))
    }
}
