import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import axios from "axios";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "animalfact",
			description: `Animal facts ;)\nType ${client.config.prefix}animalfact to check all available options`,
			aliases: ["animalfact"],
			category: "fun",
			usage: `${client.config.prefix}animalfact [option]`,
			baseXp: 20,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		// consider neko and kitsune in furry
		const animal = ["cat", "dog", "bird", "panda"];
		const chitoge = joined.trim().split(" ")[0].toLowerCase();
                let text = "";
		char.map((c) => {
			text += `📍${c.charAt(0).toUpperCase() + c.slice(1)}\n`;
			// index % 4 === 3 ? (text += '\n') : (text += ' '.repeat(10 - c.length))
		});
		if (!chitoge)
			return void M.reply(
				`🪧 *OPTIONS:*\n${text}Use ${this.client.config.prefix}animalfact (option) to get animals\nExample: ${this.client.config.prefix}animalfact cat`
			);
		if (!animal.includes(chitoge))
			return void M.reply(
				`✖️ Invalid option! 🧧\nUse ${this.client.config.prefix}animalfact to see all available options`
			

		const { data } = await axios.get(
			`https://some-random-api.ml/animal/${chitoge}`
		);

                let text = `${data.fact}`
		const buffer = await request.buffer(data.url).catch((e) => {
			return void M.reply(e.message);
		});
		while (true) {
			try {
				M.reply(
					buffer || "Could not fetch image. Please try again later",
					MessageType.image,
					undefined,
					undefined,
					`*${text}*\n`,
					undefined
				).catch((e) => {
					console.log(
						`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
					);
					// console.log('Failed')
					M.reply(`Could not fetch image. Here's the URL: ${data.url}`);
				});
				break;
			} catch (e) {
				// console.log('Failed2')
				M.reply(`Could not fetch image. Here's the URL : ${data.url}`);
				console.log(
					`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
				);
			}
		}
		return void null;
	};
}
