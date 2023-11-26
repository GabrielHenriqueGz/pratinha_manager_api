import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function isNumeric(str: string) {
    if (typeof str != "string") return false
    return !isNaN(parseInt(str))
}

export class Account {
    constructor() { }

    public async createAccount(nickName: string, days: string, hours: string) {

        let suspDays = isNumeric(days) ? parseInt(days) : 0;
        let suspHours = isNumeric(hours) ? parseInt(hours) : 0;

        suspHours = suspHours / 24 > 1 ? 23 : suspHours;

        try {
            const accountCreated = await prisma.account.create({
                data: {
                    nickName,
                    suspDays,
                    suspHours
                }
            });

            return { statusCode: 201, message: "success", data: accountCreated };
        } catch (error) {
            return { statusCode: 500, message: `Error: ${error}`, data: null };
        }
    }

    public async getAllAccounts() {
        try {
            const accounts = await prisma.account.findMany();
            return { accounts };
        } catch (error) {
            return { statusCode: 500, message: `Error: ${error}` };
        }
    }

    public async updateAccount(id: string, nickName: string, days: string, hours: string) {
        const account = await prisma.account.findUnique({
            where: {
                id: id
            }
        });

        if (!account)
            return { statusCode: 404, message: `Not found` };

        let suspDays = isNumeric(days) ? parseInt(days) : 0;
        let suspHours = isNumeric(hours) ? parseInt(hours) : 0;

        suspHours = suspHours / 24 > 1 ? 23 : suspHours;
        try {
            const accountUpdated = await prisma.account.update({
                where: {
                    id: id
                },
                data: {
                    nickName,
                    suspDays,
                    suspHours
                }
            });

            return { statusCode: 201, message: "success", data: accountUpdated };
        } catch (error) {
            return { statusCode: 500, message: `Error: ${error}`, data: null };
        }
    }

    public async deleteAccount(id: string) {

        const account = await prisma.account.findUnique({
            where: {
                id: id
            }
        });

        if (!account)
            return { statusCode: 404, message: `Not found` };

        await prisma.account.delete({
            where: {
                id: id
            }
        });

        return { statusCode: 200, message: `${account.nickName} removida!` };
    }

}