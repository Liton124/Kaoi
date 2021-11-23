import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from '../lib/BaseCommand'
import WAClient from '../lib/WAClient'
import { ISimplifiedMessage } from '../typings'

export default class EventHandler {
    constructor(public client: WAClient) {}
    if (!M.message) return
    this.spam = this.spam ? this.spam : {}
    if (M.sender in this.spam) {
        this.spam[M.sender].count++
            if (M.messageTimestamp.toNumber() - this.spam[M.sender].lastspam > 20) {
                if (this.spam[M.sender].count > 10) {
                    M.reply('*Jangan Spam!!*')
                }
                this.spam[M.sender].count = 0
                this.spam[M.sender].lastspam = M.messageTimestamp.toNumber()
            }
        }
        else this.spam[M.sender] = {
            jid: M.sender,
            count: 0,
            lastspam: 0
        }
    }
}
