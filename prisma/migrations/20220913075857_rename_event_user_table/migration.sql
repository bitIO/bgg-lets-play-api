/*
  Warnings:

  - You are about to drop the `user_events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_events" DROP CONSTRAINT "user_events_eventId_fkey";

-- DropForeignKey
ALTER TABLE "user_events" DROP CONSTRAINT "user_events_userId_fkey";

-- DropTable
DROP TABLE "user_events";

-- CreateTable
CREATE TABLE "events_users" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "events_users_pkey" PRIMARY KEY ("userId","eventId")
);

-- AddForeignKey
ALTER TABLE "events_users" ADD CONSTRAINT "events_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_users" ADD CONSTRAINT "events_users_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
