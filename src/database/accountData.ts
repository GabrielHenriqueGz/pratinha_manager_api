import { Prisma, PrismaClient } from "@prisma/client";
import {handleSuspensionTime} from '../utils/utils';

const prisma = new PrismaClient();

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

    public async getAllAccounts(isUpdate: boolean = false) {
        try {

            let accounts = null;

            await this.updateSuspendedAccount();

            if (isUpdate) {
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

    public async updateAccount(id: string, days: string, hours: string) {
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