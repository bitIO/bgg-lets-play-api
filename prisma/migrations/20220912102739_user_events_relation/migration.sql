/*
  Warnings:

  - The primary key for the `user_events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user_events` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user_events` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user_events` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_events_userId_eventId_key";

-- AlterTable
ALTER TABLE "user_events" DROP CONSTRAINT "user_events_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD CONSTRAINT "user_events_pkey" PRIMARY KEY ("userId", "eventId");
