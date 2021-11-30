import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "addxp",
			description: "for mods only",
			category: "dev",
			usage: `${client.config.prefix}addxp [@tag]`,
			modsOnly: true,
			baseXp: 0,
		});
	}
	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void (await M.reply(`Please provide the Broadcast Message.`));
		const amount: any = joined.trim();
		if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
		if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
		const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid;
		(await this.client.getUser(user)).Xp = amount;
		await M.reply(`Successfully added ${amount} of xp.`);
	};
}
