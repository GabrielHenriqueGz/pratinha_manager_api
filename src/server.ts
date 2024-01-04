import { Bot } from './bot';
import Fastify from 'fastify';

const app = Fastify();

app.get('/ping', function (request, reply) {
    reply.send({ data: new Date() })
});
const discordBot = new Bot();
discordBot.startBot();
app.listen({ port: 8001, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1)
    }
    console.log(`Server is now listening on ${address}`);
})
