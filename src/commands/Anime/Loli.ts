import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import Loli from "lolis.life";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "loli",
			description: `Will send you random loli image.`,
			aliases: ["loli"],
			category: "anime",
			usage: `${client.config.prefix}loli `,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		// fetch result of https://www.npmjs.com/package/lolis.life
		const loli = new Loli();
		const i = await loli.getSFWLoli();
		const buffer = await request.buffer(i.url).catch((e) => {
			return void M.reply(e.message);
		});
		while (true) {
			try {
				M.reply(
			
