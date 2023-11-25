/*
  Warnings:

  - You are about to drop the column `email` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `suspend` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "suspend",
DROP COLUMN "user",
ADD COLUMN     "suspTime" BIGINT NOT NULL DEFAULT 0;
