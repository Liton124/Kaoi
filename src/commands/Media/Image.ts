import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";
import { MessageType, Mimetype } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "image",
			description: `Will search the given image from google.`,
			aliases: ["img"],
			category: "utils",
			usage: `${client.config.prefix}img [term]`,
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		const search: any = joined.trim();
		const term: string = search[0];
		const img = await axios(`https://imsea.herokuapp.com/api/1?q=${term}`);

		const res = `*🌟 Here you go.*`;
		this.client.sendMessage(M.from, { url: img[i].url }, MessageType.image, {
	            quoted: M.WAMessage,	
                    mimetype: Mimetype.png,
	            caption: `${res}`,
		};
	}
}
