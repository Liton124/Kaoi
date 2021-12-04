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
 
