import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import {z} from 'zod';

const app = fastify();

const prisma = new PrismaClient();

app.get('/account', async () => {
    const accounts = await prisma.account.findMany();
    return {accounts};
});

app.get('/account/:id', async (request, reply) => {

    const findUniqueSchema = z.object({
        id: z.string()
    });

    const account = await prisma.account.findUnique({
        where: {
            id: findUniqueSchema.parse(request.params).id
        }
    });

    if(account)
        return {account};

    return reply.status(404).send();
});

app.post('/account', async (request, reply) => {

    const createAccountSchema = z.object({
        nickName: z.string(),
        suspTime: z.number()
    });

    const {nickName, suspTime} = createAccountSchema.parse(request.body);

    await prisma.account.create({
        data: {
            nickName,
            suspTime
        }
    });

    return reply.status(201).send();
});

app.put('/account/:id', async (request, reply) => {

    const findUniqueSchema = z.object({
        id: z.string()
    });

    const account = await prisma.account.findUnique({
        where: {
            id: findUniqueSchema.parse(request.params).id
        }
    });

    if(!account)
        return reply.status(404).send();

    const updateAccountSchema = z.object({
        suspTime: z.number()
    });

    const {suspTime} = updateAccountSchema.parse(request.body);

    await prisma.account.update({
        where: {
            id: findUniqueSchema.parse(request.params).id
        },
        data: {
            suspTime
        }
    });

    return {account};
});

app.delete('/account/:id', async (request, reply) => {

    const findUniqueSchema = z.object({
        id: z.string()
    });

    const account = await prisma.account.findUnique({
        where: {
            id: findUniqueSchema.parse(request.params).id
        }
    });

    if(!account)
        return reply.status(404).send();

    await prisma.account.delete({
        where: {
            id: findUniqueSchema.parse(request.params).id
        }
    });

    return reply.status(200).send();
});

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 8001
}).then(() => {
    console.log('HTTP Server Running');
})