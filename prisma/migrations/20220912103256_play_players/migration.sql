/*
  Warnings:

  - You are about to drop the column `userid` on the `play_players` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "play_players" DROP COLUMN "userid",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "play_players" ADD CONSTRAINT "play_players_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
