import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'profile',
            description: 'Displays user-profile 📜',
            category: 'general',
            usage: `${client.config.prefix}profile [tag/quote]`,
            aliases: ['p', 'pf'],
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid
        let username = user === M.sender.jid ? M.sender.username : ''
        if (!username) {
            const contact = this.client.getContact(user)
            username = contact.notify || contact.vname || contact.name || user.split('@')[0]
        }
        let pfp: string
        try {
            pfp = await this.client.getProfilePicture(user)
        } catch (err) {
            M.reply(`Profile Picture is not Accessible for ${username}`)
            pfp =
                'https://wallpaperaccess.com/full/5304840.png'
        }
        let haigusha;
        if (await (await this.client.getUser(user)).married) {
          haigusha = await (await this.client.getUser(user)).haigusha.name;
        } else {
          haigusha = "None";
        }
        const xp = (await this.client.getUser(user)).Xp
        let role
        if (xp < 500) {
            role = '🌸 Citizen'
        } else if (xp < 1000) {
            role = '🔎 Cleric'
        } else if (xp < 2000) {
            role = '🔮 Wizard'
        } else if (xp < 5000) {
            role = '♦️ Mage'
        } else if (xp < 10000) {
            role = '🎯 Noble'
        } else if (xp < 25000) {
            role = '✨ Elite'
        } else if (xp < 50000) {
            role = '🔶️ Ace'
        } else if (xp < 75000) {
            role = '🌀 Hero'
        } else if (xp < 100000) {
            role =  '💥 Ultrahero' 
        } else if (xp < 150000) {
            role = '🗿 Legend'
        } else if (xp < 200000) {
            role = '🎩 GrandMaster'
        } else if (xp < 275000) {
            role = '💎 Supreme'
        } else {
            role = '❄️ Mystic' 
        }
 
        let level
        if (xp < 500) {
            level = '1'
        } else if (xp < 1000) {
            level = '2'
        } else if (xp < 2000) {
            level = '3'
        } else if (xp < 5000) {
            level = '4'
        } else if (xp < 10000) {
            level = '5'
        } else if (xp < 25000) {
            level = '6'
        } else if (xp < 50000) {
            level = '7'
        } else if (xp < 75000) {
            level = '8'
        } else if (xp < 100000) {
            level = '9'
        } else if (xp < 150000) {
            level = '10'
        } else if (xp < 200000) {
            level = '11' 
        } else if (xp < 275000) {
            level = '12'
        } else {
            level = 'max'
        }
        await M.reply(
            await request.buffer(
                pfp ||
                    'https://wallpaperaccess.com/full/5304840.png'
            ),
            MessageType.image,
            undefined,
            undefined,
            `🏮 *Username: ${username}*\n\n🎫 *About: ${
                (await this.client.getStatus(user)).status || 'None'
            }*\n\n〽️ *Level: ${level}*\n\n🌟 *Xp: ${xp || 0}*\n\n🍁 *Role: ${role}*\n\n👑 *Admin: ${
                M.groupMetadata?.admins?.includes(user) || false
            }*\n\n❌ *Ban: ${(await this.client.getUser(user)).ban || false}*`
        )
    }
}
