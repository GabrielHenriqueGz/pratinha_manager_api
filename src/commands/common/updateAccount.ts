import { ActionRowBuilder, ApplicationCommandType, Collection, ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Command } from "../../structs/types/Commands";
import { Account } from "../../database/accountData";

const accountData = new Account();
let lastInteraction: boolean = false;

async function selectAccount() {

    const data = (await accountData.getAllAccounts(true)).data;

    if (!data || !data.length) return;

    const row = new ActionRowBuilder<StringSelectMenuBuilder>({
        components: [
            new StringSelectMenuBuilder({
                customId: "select-account-update",
                placeholder: "Selecione uma conta...",
                options: []
            })
        ]
    });

    data.forEach((d: any) => {
        row.components[0].addOptions(
            { label: `${d.nickName}`, value: `${d.id}`, emoji: '⏱️' },
        )
    })

    return row;
}

function updateAccountModal() {

    const modal = new ModalBuilder({
        customId: "update-account-modal",
        title: "Atualizar suspansão"
    });


    const suspDays = new ActionRowBuilder<TextInputBuilder>({
        components: [
            new TextInputBuilder({
                customId: "susp-days",
                label: "Suspensão/dias",
                placeholder: "Dias de suspensão",
                style: TextInputStyle.Short,
                minLength: 1,
                maxLength: 2,
                required: false,
            })
        ]
    });

    const suspHours = new ActionRowBuilder<TextInputBuilder>({
        components: [
            new TextInputBuilder({
                customId: "susp-hours",
                label: "Suspensão/horas",
                placeholder: "Horas de suspensão",
                style: TextInputStyle.Short,
                minLength: 1,
                maxLength: 2,
                required: false,
            })
        ]
    });

    modal.setComponents(suspDays, suspHours);

    return modal;
}

export default new Command({
    name: "atualizar",
    description: "Atualizar uma conta",
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }) {
        const row = await selectAccount();
        if (row)
            interaction.reply({ content: "Selecione uma conta para atualizar...", components: [row] });
        else
            interaction.reply({ content: "Não há conta(s) cadastrada(s) ou liberada(s)", components: [] });
    }, selects: new Collection([
        ["select-account-update", async (selectInteraction) => {

            if (lastInteraction) {
                selectInteraction.reply({ content: "Aguarde...", components: [] });
                return;
            }

            await selectInteraction.showModal(updateAccountModal());
            lastInteraction = true;
            const modalInteraction = await selectInteraction.awaitModalSubmit({ time: 15_000, filter: (i: any) => i.user.id == selectInteraction.user.id }).catch(() => null);
            if (!modalInteraction) {
                lastInteraction = false;
                return;
            }
            lastInteraction = false;

            const { fields } = modalInteraction;
            const id = selectInteraction.values[0];
            const suspDays = fields.getTextInputValue("susp-days");
            const suspHours = fields.getTextInputValue("susp-hours");

            const accountUpdated = (await accountData.updateAccount(id, suspDays, suspHours)).data;

            modalInteraction.reply({ephemeral: true, content: `Conta atualizada!\n  > ${accountUpdated?.nickName}\n  > ${accountUpdated?.suspendedUntil ? `Suspensa até: ${accountUpdated?.suspendedUntil.toLocaleString('pt-br')}` : '🐒 Liberada!'}` });

        }]
    ])
});