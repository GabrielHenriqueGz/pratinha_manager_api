import { Prisma, PrismaClient } from "@prisma/client";
import * as utils from '../utils/utils';

const prisma = new PrismaClient();

function handleSuspensionTime(days: string, hours: string): Date | null {
    let suspDays = utils.isNumeric(days) ? parseInt(days) : null;
    let suspHours = utils.isNumeric(hours) ? parseInt(hours) : null;
    suspHours = (suspHours && suspHours / 24 > 1) ? 23 : suspHours;
    let suspendedUntil = null;
    if (suspDays)
        suspendedUntil = utils.addDays(suspDays);
    if (suspHours)
        suspendedUntil = suspendedUntil ? utils.addHours(suspendedUntil, suspHours) : utils.addHours(new Date(), suspHours);
    return suspendedUntil;
}

export class Account {
    constructor() { }

    public async createAccount(nickName: string, days: string, hours: string) {

        let suspendedUntil = handleSuspensionTime(days, hours);

        try {
            const accountCreated = await prisma.account.create({
                data: {
                    nickName,
                    suspendedUntil,
                    released: !suspendedUntil
                }
            });
            return { statusCode: 201, message: "success", data: accountCreated };
        } catch (error) {
            return { statusCode: 500, message: `Error: ${error}`, data: null };
        }
    }

    public async getAllAccounts(action: string = '') {
        try {

            let accounts = null;

            await this.updateSuspendedAccount();

            if (action == "updatesusp") {
                accounts = await prisma.account.findMany({
                    where: { released: true }
                });
            } else {
                accounts = await prisma.account.findMany();
            }

            return { status: 200, message: "success", data: accounts };

        } catch (error) {
            return { status: 500, message: `Error: ${error}`, data: null };
        }
    }

    public async updateAccount(id: string, nickName: string, days: string, hours: string) {
        const account = await prisma.account.findUnique({
            where: {
                id: id
            }
        });

        if (!account)
            return { status: 404, message: `Not found` };

        let suspendedUntil = handleSuspensionTime(days, hours);

        try {
            const accountUpdated = await prisma.account.update({
                where: {
                    id: id
                },
                data: {
                    nickName,
                    suspendedUntil,
                    released: !suspendedUntil,
                    updatedAt: new Date()
                }
            });
            return { status: 200, message: "success", data: accountUpdated };
        } catch (error) {
            return { status: 500, message: `Error: ${error}`, data: null };
        }
    }

    public async deleteAccount(id: string) {

        const account = await prisma.account.findUnique({
            where: {
                id: id
            }
        });

        if (!account)
            return { status: 404, message: `Not found` };

        await prisma.account.delete({
            where: {
                id: id
            }
        });

        return { status: 200, message: `${account.nickName} removida!` };
    }

    private async updateSuspendedAccount() {
        try {
            return await prisma.account.updateMany({
                where: {
                    released: false,
                    suspendedUntil: {
                        lte: new Date()
                    }
                },
                data: {
                    suspendedUntil: null,
                    released: true,
                    updatedAt: new Date()
                }
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return;
        }

    }

}