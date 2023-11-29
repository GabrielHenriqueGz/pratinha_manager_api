import { ExtendedClient } from '../structs/ExtendedClient';

const client = new ExtendedClient();

export { client };

export class Bot {
    constructor() { }

    public startBot() {
        client.start();
        client.on('ready', (c) => {
            console.log(`${c?.user?.username} is online!`);
        });
        client.on('messageCreate', async (message) => {
            if (message.author.id == client.user?.id) return;

            const optionsEmbed = {
                color: 0x0099ff,
                title: "Opções disponíveis:",
                fields: [
                    { name: "👉 /criar", value: " * Cria uma nova conta.", inline: false },
                    { name: "👉 /listar", value: " * Lista todas as contas.", inline: false },
                    { name: "👉 /atualizar", value: " * Atualiza a suspensão de uma conta.", inline: false },
                    { name: "👉 /remover", value: " * Remove uma conta.", inline: false }
                ]
            }
            await message.reply({
                content: `Olá, ${message.author.username}!`, embeds: [optionsEmbed]
            });
        });
    }
}