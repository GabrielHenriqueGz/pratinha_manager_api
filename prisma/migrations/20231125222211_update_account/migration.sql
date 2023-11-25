/*
  Warnings:

  - You are about to alter the column `suspTime` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "suspTime" SET DATA TYPE INTEGER;
