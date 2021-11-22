import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "gaycheck",
			description: "Displays User's Stats",
			category: "fun",
			usage: `${client.config.prefix}rank [tag/quote]`,
			aliases: ["gcheck"],
			baseXp: 10, 
                });
        }
        run = async (M: ISimplifiedMessage): Promise<void> => {
