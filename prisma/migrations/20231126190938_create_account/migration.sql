-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "suspDays" INTEGER NOT NULL DEFAULT 0,
    "suspHours" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);