import { ApplicationCommandType } from "discord.js";
import { Command } from "../../structs/types/Commands";
import { Account } from "../../database/accountData";
import { getSuspTimeLeft } from "../../utils/utils";

const accountData = new Account();

async function accountsDetails() {

    const allAccounts = (await accountData.getAllAccounts()).data;
    const data = allAccounts;

    const accountsEmbed = {
        color: 0x0099ff,
        title: 'Contas',
        fields: [
            { name: "", value: "", inline: true }
        ]
    }

    if (data && data.length)
        data.map((d:any) => {

            accountsEmbed.fields.push(
                { name: `${d.suspendedUntil ? '🚫' : '✅'}  ${d.nickName}  -  ${d.suspendedUntil ? `⏱️ Suspensa até: ${d.suspendedUntil.toLocaleString('pt-br')}` : '🐒 Liberada!'}`, value: `${d.suspendedUntil ? getSuspTimeLeft(d.suspendedUntil):''}`, inline: false }
            )
        });

    return accountsEmbed;
}

export default new Command({
    name: "listar",
    description: "Listar contas cadastradas",
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }) {
        const embeds = await accountsDetails();
        interaction.reply({ components: [], embeds: [embeds] });
    }
});