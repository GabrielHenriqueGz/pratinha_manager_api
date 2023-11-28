import { Bot } from './bot';
import Fastify from 'fastify';

const app = Fastify();

app.get('/', function (request, reply) {
    reply.send({ data: new Date() })
});
const discordBot = new Bot();
discordBot.startBot();
app.listen({ port: 8001 }, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`Server is now listening on ${address}`)
})
