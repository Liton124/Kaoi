import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from '../lib/BaseCommand'
import WAClient from '../lib/WAClient'
import { ISimplifiedMessage } from '../typings'

export default class SpamHandler {
    constructor(public client: WAClient, handler: MessageHandler) {}
    async all(m) {
        if (!m.message) return
        this.spam = this.spam ? this.spam : {}
        if (m.sender in this.spam) {
            this.spam[m.sender].count++
            if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 10) {
                if (this.spam[m.sender].count > 10) {
                    //global.db.data.users[m.sender].banned = true
                    m.reply('*Jangan Spam!!*')
                }
                this.spam[m.sender].count = 0
                this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
            }
        }
        else this.spam[m.sender] = {
            jid: m.sender,
            count: 0,
            lastspam: 0
        }
    }
}
