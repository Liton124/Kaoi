import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import Canvacord from "canvacord";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "rank",
			description: "Displays User's Stats",
			category: "general",
			usage: `${client.config.prefix}rank [tag/quote]`,
			aliases: ["stats"],
			baseXp: 10,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
		const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid;
		let username = user === M.sender.jid ? M.sender.username : "";
		if (!username) {
			const contact = this.client.getContact(user);
			username =
				contact.notify || contact.vname || contact.name || user.split("@")[0];
		}
		let pfp: string;
		try {
			pfp = await this.client.getProfilePicture(user);
		} catch (err) {
			M.reply(`Profile Picture not Accessible of ${username}`);
			pfp =
				"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
		}
		const xp = (await this.client.getUser(user)).Xp;
		let role: string;
		if (xp < 500) {
			role = "🌸 Citizen";
		} else if (xp < 1000) {
			role = "🔎 Cleric";
		} else if (xp < 2000) {
			role = "🔮 Wizard";
		} else if (xp < 5000) {
			role = "♦️ Mage";
		} else if (xp < 10000) {
			role = "🎯 Noble";
		} else if (xp < 25000) {
			role = "✨ Elite";
		} else if (xp < 50000) {
			role = "🔶️ Ace";
		} else if (xp < 75000) {
			role = "🌀 Hero";
		} else if (xp < 100000) {
			role = "💥 Ultrahero";
		} else if (xp < 150000) {
			role = "☠️ Legend";
                } else if (xp < 200000) {
                        role = "🎩 GrandMaster";
                } else { (xp < 275000) {
                        role = "💎 Supreme";
		} else {
                        role = "❄️ Mystic";
                }
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let level: number;
		if (xp < 500) {
			level = 1;
		} else if (xp < 1000) {
			level = 2;
		} else if (xp < 2000) {
			level = 3;
		} else if (xp < 5000) {
			level = 4;
		} else if (xp < 10000) {
			level = 5;
		} else if (xp < 25000) {
			level = 6;
		} else if (xp < 50000) {
			level = 7;
		} else if (xp < 75000) {
			level = 8;
		} else if (xp < 100000) {
			level = 9;
                } else if (xp < 150000) {
			level = 10;
		} else if (xp < 200000) {
			level = 11;
		} else if (xp < 275000) {
			level = 12;
		} else {
                        level = 13;
                }
		let required: number;
		if (xp < 500) {
			required = 500;
		} else if (xp < 1000) {
			required = 1000;
		} else if (xp < 2000) {
			required = 2000;
		} else if (xp < 5000) {
			required = 5000;
		} else if (xp < 10000) {
			required = 10000;
		} else if (xp < 25000) {
			required = 25000;
		} else if (xp < 50000) {
			required = 50000;
		} else if (xp < 75000) {
			required = 75000;
		} else if (xp < 100000) {
			required = 100000;
                } else if (xp < 150000) {
			required = 150000;
		} else if (xp < 200000) {
			required = 200000;
		} else if (xp < 275000) {
			required = 275000;
		} else {
			required = 0;
		}
		const rank = new Canvacord.Rank()
			.setAvatar(pfp)
			.setCurrentXP(xp || 0)
			.setRequiredXP(required)
			.setStatus("online", true)
			.setLevel(level, "Level:", true)
			.setRank(0, `Role: ${role}`, true)
			.setProgressBar("#FFC0CB", "COLOR")
			.setOverlay("#FFFFFF")
			.setUsername(username)
			.setDiscriminator("0007")
			.setBackground("COLOR", "#FFC0CB");
		rank.build({}).then((rankcard) => {
			const text = `🏮 *Username: ${username}*\n\n〽️ *Level: ${level}*\n\n⭐ *Xp: ${
				xp || 0
			} / ${required}*\n\n💫 *Role: ${role}*\n\n`;
			M.reply(
				rankcard,
				MessageType.image,
				undefined,
				undefined,
				text,
				undefined
			);
		});
	};
}
