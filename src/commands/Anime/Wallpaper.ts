/** @format */

import { AnimeWallpaper } from "anime-wallpapers";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "wallpaper",
			description: `Will send you random anime wallpaper of the given term.`,
			aliases: ["wpaper", "wp"],
			category: "anime",
			usage: `${client.config.prefix}wallpaper [term,amount]`,
			baseXp: 20,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void (await M.reply(`Give me a wallpaper term to search, Baka!`));
		const chitoge: any = joined.trim().split(",");
		const term: string = kaoi[0];
		const amount: number = kaoi[1];
		if (!amount)
			return void M.reply(
				`Give me the number of wallpapers to send, Baka!\n\nExample: *${this.client.config.prefix}wallpaper BTS,5*`
			);
		if (amount > 20)
			return void M.reply(`Do you want me to spam in this group?`);
		const wall = new AnimeWallpaper();
		const wallpaper = await wall.getAnimeWall2(term).catch(() => null);
		if (!wallpaper)
			return void (await M.reply(
				`Couldn't find any matching term of wallpaper.`
			));
		for (let i = 0; i < amount; i++) {
			const res = `*🌟 Here you go.*`;
			this.client.sendMessage(
				M.from,
				{ url: wallpaper[i].image },
				MessageType.image,
				{
					quoted: M.WAMessage,
					caption: `${res}`,
				}
			);
		}
	};
}
	
