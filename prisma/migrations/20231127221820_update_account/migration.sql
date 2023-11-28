/*
  Warnings:

  - You are about to drop the column `suspDays` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `suspHours` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "suspDays",
DROP COLUMN "suspHours",
ADD COLUMN     "suspendedUntil" TIMESTAMP(3);
