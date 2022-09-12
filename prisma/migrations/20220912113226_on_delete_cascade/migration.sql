/*
  Warnings:

  - Made the column `userId` on table `plays` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "play_players" DROP CONSTRAINT "play_players_playId_fkey";

-- DropForeignKey
ALTER TABLE "play_players" DROP CONSTRAINT "play_players_userId_fkey";

-- DropForeignKey
ALTER TABLE "plays" DROP CONSTRAINT "plays_gameId_fkey";

-- DropForeignKey
ALTER TABLE "plays" DROP CONSTRAINT "plays_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_collection" DROP CONSTRAINT "user_collection_gameId_fkey";

-- DropForeignKey
ALTER TABLE "user_collection" DROP CONSTRAINT "user_collection_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_events" DROP CONSTRAINT "user_events_eventId_fkey";

-- DropForeignKey
ALTER TABLE "user_events" DROP CONSTRAINT "user_events_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_game_status" DROP CONSTRAINT "user_game_status_gameId_fkey";

-- DropForeignKey
ALTER TABLE "user_game_status" DROP CONSTRAINT "user_game_status_userId_fkey";

-- AlterTable
ALTER TABLE "plays" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user_events" ADD CONSTRAINT "user_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_events" ADD CONSTRAINT "user_events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_game_status" ADD CONSTRAINT "user_game_status_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_game_status" ADD CONSTRAINT "user_game_status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plays" ADD CONSTRAINT "plays_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plays" ADD CONSTRAINT "plays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "play_players" ADD CONSTRAINT "play_players_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "play_players" ADD CONSTRAINT "play_players_playId_fkey" FOREIGN KEY ("playId") REFERENCES "plays"("id") ON DELETE CASCADE ON UPDATE CASCADE;
