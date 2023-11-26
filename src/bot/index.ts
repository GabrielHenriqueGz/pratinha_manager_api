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
        client.on('messageCreate', (message) => {
            if (message.author.id == client.user?.id) return;
            message.reply({
                content: `Olá ${message.author.username}, digite /options para ver as opções disponíveis!`
            });
        });
    }
}