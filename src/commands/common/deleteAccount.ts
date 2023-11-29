import { ActionRowBuilder, ApplicationCommandType, Collection, StringSelectMenuBuilder } from "discord.js";
import { Command } from "../../structs/types/Commands";
import { Account } from "../../database/accountData";

const accountData = new Account();

async function selectAccount(action: string) {

    const data = (await accountData.getAllAccounts()).data;

    if (!data || !data.length) return;

    const row = new ActionRowBuilder<StringSelectMenuBuilder>({
        components: [
            new StringSelectMenuBuilder({
                customId: "select-account-delete",
                placeholder: "Selecione uma conta...",
                options: []
            })
        ]
    });

    data.forEach((d: any) => {
        row.components[0].addOptions(
            { label: `${d.nickName}`, value: `${d.id}`, emoji: '❌' },
        )
    })

    return row;
}

export default new Command({
    name: "remover",
    description: "Remover uma conta",
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }) {

        const rowEdit = await selectAccount("deleteaccount");
        if (rowEdit)
            await interaction.reply({ content: "Selecione uma conta para remover...", components: [rowEdit] });
        else
            await interaction.reply({ content: "Não existem conta(s) cadastrada(s)", components: [] });
    },
    selects: new Collection([
        ["select-account-delete", async (selectInteraction) => {
            const id = selectInteraction.values[0];
            const accountDeleted = await accountData.deleteAccount(id);
            await selectInteraction.update({ content: `${accountDeleted.message}`, components: [] });
        }]
    ])
});