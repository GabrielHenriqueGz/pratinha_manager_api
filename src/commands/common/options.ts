import { Command } from "../../structs/types/Commands";
import { ActionRowBuilder, ApplicationCommandType, ComponentType, EmbedBuilder, ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Account } from "../../data/account-data";

const accountData = new Account();

let modalInteractionActive: boolean = false;

function newAccountModal(nick: any = null) {
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
                value: nick ? nick : "",
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

async function accountsDetails() {

    const allAccounts = await accountData.getAllAccounts();
    const data = allAccounts.accounts;

    const accountsEmbed = {
        color: 0x0099ff,
        title: 'Contas',
        fields: [
            { name: "", value: "", inline: true }
        ]
    }

    if (data && data.length)
        data.map(d => {
            accountsEmbed.fields.push(
                { name: `${d.suspDays || d.suspHours ? '🚫' : '✅'}  ${d.nickName}  -  ${d.suspDays || d.suspHours ? `⏱️ ${d.suspDays} dias e ${d.suspHours} horas` : 'Liberada'}`, value: `\n`, inline: false }
            )
        });

    return accountsEmbed;
}

async function selectAccount(action: string) {

    const allAccounts = await accountData.getAllAccounts();
    const data = allAccounts.accounts;

    if (!data || !data.length) return;

    const row = new ActionRowBuilder<StringSelectMenuBuilder>({
        components: [
            new StringSelectMenuBuilder({
                customId: "select-account",
                placeholder: "Selecione uma conta...",
                minValues: 1,
                maxValues: 1,
                options: []
            })
        ]
    });

    data.forEach(d => {
        row.components[0].addOptions(
            { label: `${d.nickName}`, value: `${d.id}/${action}/${d.nickName}/${d.suspDays}/${d.suspHours}`, emoji: `${action == 'deleteaccount' ? '❌' : '⏱️'}` },
        )
    })

    return row;
}

export default new Command({
    name: "options",
    description: "Ver opções",
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }) {

        const row = new ActionRowBuilder<StringSelectMenuBuilder>({
            components: [
                new StringSelectMenuBuilder({
                    customId: "options-menu",
                    placeholder: "Selecione uma opção...",
                    minValues: 1,
                    maxValues: 1,
                    options: [
                        { label: "Nova conta", value: "newaccount", emoji: "✅" },
                        { label: "Listar contas", value: "listaccounts", emoji: "🧾" },
                        { label: "Editar suspensão", value: "updatesusp", emoji: "✏️" },
                        { label: "Remover Conta", value: "deleteaccount", emoji: "❌" },
                    ]
                })
            ]
        });

        const msg = await interaction.reply({
            components: [row],
            fetchReply: false
        });

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect });
        collector.on("collect", async (selectInteration) => {
            
            if(modalInteractionActive) {
                selectInteration.update({ content: "Aguarde...", components: []});
                return;
            }

            const opt = selectInteration.values[0];
            switch (opt) {
                case "newaccount":
                    selectInteration.showModal(newAccountModal());
                    modalInteractionActive = true;
                    const modalInteraction = await selectInteration.awaitModalSubmit({ time: 15_000, filter: (i: any) => i.user.id == selectInteration.user.id}).catch(() => null);
                    if (!modalInteraction) {
                        modalInteractionActive = false;
                        return;  
                    }
                    modalInteractionActive = false;
                    const { fields } = modalInteraction;
                    const nick = fields.getTextInputValue("nick-name");
                    const suspDays = fields.getTextInputValue("susp-days");
                    const suspHours = fields.getTextInputValue("susp-hours");

                    const accountCreated = await accountData.createAccount(nick, suspDays, suspHours);

                    selectInteration.deleteReply();
                    modalInteraction.reply({ content: `Conta cadastrada!\n  > ${nick}\n  > ${accountCreated.data?.suspDays} dia(s)\n  > ${accountCreated.data?.suspHours} hora(s)` });
                    break;
                case "listaccounts":
                    const embeds = await accountsDetails();
                    selectInteration.update({ components: [], embeds: [embeds] });
                    break;
                case "updatesusp":
                    const rowEdit = await selectAccount(opt);
                    if (rowEdit)
                        selectInteration.update({ content: "Selecione uma conta para atualizar...", components: [rowEdit] });
                    else
                        selectInteration.update({ content: "Não há conta(s) cadastrada(s)", components: [] });
                    break;
                case "deleteaccount":
                    const rowDelete = await selectAccount(opt);
                    if (rowDelete)
                        selectInteration.update({ content: "Selecione uma conta para remover...", components: [rowDelete] });
                    else
                        selectInteration.update({ content: "Não há conta(s) cadastrada(s)", components: [] });
                    break;

                default:
                    const arrayData = opt.split("/");

                    if (opt.includes("/deleteaccount")) {
                        const id = opt.substring(0, opt.indexOf('/'));
                        const accountDeleted = await accountData.deleteAccount(id);
                        selectInteration.update({ content: `${accountDeleted.message}`, components: [] });
                    } else if (opt.includes("/updatesusp")) {

                        const id = arrayData[0];
                        const nickData = arrayData[2];

                        selectInteration.showModal(newAccountModal(nickData));
                        modalInteractionActive = true;
                        const modalInteraction = await selectInteration.awaitModalSubmit({ time: 15_000, filter: (i: any) => i.user.id == selectInteration.user.id }).catch(() => null);
                        if (!modalInteraction) {
                            modalInteractionActive = false;
                            return;  
                        }
                        modalInteractionActive = false;
                        const { fields } = modalInteraction;
                        const nick = fields.getTextInputValue("nick-name");
                        const suspDays = fields.getTextInputValue("susp-days");
                        const suspHours = fields.getTextInputValue("susp-hours");

                        const accountUpdated = await accountData.updateAccount(id, nick, suspDays, suspHours);

                        selectInteration.deleteReply();
                        modalInteraction.reply({ content: `Conta Atualizada!\n  > ${nick}\n  > ${accountUpdated.data?.suspDays} dia(s)\n  > ${accountUpdated.data?.suspHours} hora(s)` });
                    } else {
                        selectInteration.update({ components: [] });
                    }
                    break;
            }
        });
    }
});