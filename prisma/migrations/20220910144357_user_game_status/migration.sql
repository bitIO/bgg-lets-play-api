/*
  Warnings:

  - You are about to drop the column `userId` on the `games` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_userId_fkey";

-- AlterTable
ALTER TABLE "games" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "user_game_status" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "own" BOOLEAN NOT NULL,
    "preordered" BOOLEAN NOT NULL,
    "prevowned" BOOLEAN NOT NULL,
    "want" BOOLEAN NOT NULL,
    "wanttobuy" BOOLEAN NOT NULL,
    "wanttoplay" BOOLEAN NOT NULL,
    "wishlist" BOOLEAN NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_game_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_game_status_gameId_userId_key" ON "user_game_status"("gameId", "userId");

-- AddForeignKey
ALTER TABLE "user_game_status" ADD CONSTRAINT "user_game_status_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_game_status" ADD CONSTRAINT "user_game_status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
