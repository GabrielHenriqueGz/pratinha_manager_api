import { ActionRowBuilder, ApplicationCommandType, CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Command } from "../../structs/types/Commands";
import { Account } from "../../database/accountData";

const accountData = new Account();
let lastInteraction: boolean = false;

function newAccountModal() {
    const modal = new ModalBuilder({
        customId: "new-account-modal",
        title: "Nova conta"
    });

    const nickName = new ActionRowBuilder<TextInputBuilder>({
        components: [
            new TextInputBuilder({
                customId: "nick-name",
                label: "Nick",
                placeholder: "Informe o nick steam",
                style: TextInputStyle.Short,
                required: true,
            })
        ]
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

    modal.setComponents(nickName, suspDays, suspHours);

    return modal;
}



export default new Command({
    name: "criar",
    description: "Criar uma nova conta",
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }) {

        if (lastInteraction) {
            interaction.reply({ content: "Aguarde...", components: [] });
            return;
        }

        await interaction.showModal(newAccountModal());
        lastInteraction = true;
        const modalInteraction = await interaction.awaitModalSubmit({ time: 15_000, filter: (i: any) => i.user.id == interaction.user.id }).catch(() => null);
        if (!modalInteraction) {
            lastInteraction = false;
            return;
        }
        lastInteraction = false;

        const { fields } = modalInteraction;
        const nick = fields.getTextInputValue("nick-name");
        const suspDays = fields.getTextInputValue("susp-days");
        const suspHours = fields.getTextInputValue("susp-hours");

        const accountCreated = await accountData.createAccount(nick, suspDays, suspHours);

        modalInteraction.reply({ ephemeral: true, content: `Conta cadastrada!\n  > ${nick}\n  > ${accountCreated.data?.suspendedUntil ? `Suspensa até: ${accountCreated.data?.suspendedUntil.toLocaleString('pt-br')}` : '🐒 Liberada!'}` });
    }
});