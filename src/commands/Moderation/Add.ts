import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import { MessageType } from "@adiwajshing/baileys"
export default class Command extends BaseCommand {

    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
           command: 'add',
            description: 'add user in group',
            aliases: ['add'],
            category: 'moderation',
            usage: `${client.config.prefix}add`,
            adminOnly: true
        })
    }
    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!text) throw `_Enter number!_ \nExample:\n\n${usedPrefix + command + ' ' + global.owner[0]}`
        let _participants = participants.map(user => user.jid)
        let users = (await Promise.all(
    text.split(',')
      .map(v => v.replace(/[^0-9]/g, ''))
      .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
      .map(async v => [
        v,
        await conn.isOnWhatsApp(v + '@s.whatsapp.net')
      ])
  )).filter(v => v[1]).map(v => v[0] + '@c.us')
  let response = await conn.groupAdd(m.chat, users)
  if (response[users] == 408) throw `The number has been out recently\nCan only enter via ${this.client.config.prefix}link`
  let pp = await conn.getProfilePicture(m.chat).catch(_ => false)
  let jpegThumbnail = pp ? await (await fetch(pp)).buffer() : false
  for (let user of response.participants.filter(user => Object.values(user)[0].code == 403)) {
    let [[jid, {
      invite_code,
      invite_code_exp
    }]] = Object.entries(user)
    let teks = `Invite @${jid.split('@')[0]} using invite...`
    m.reply(teks, null, {
      contextInfo: {
        mentionedJid: conn.parseMention(teks)
      })
    }
    await conn.sendGroupV4Invite(m.chat, jid, invite_code, invite_code_exp, false, 'Invitation to join my WhatsApp group', jpegThumbnail ? {
      jpegThumbnail
    } : {})
  }
}
