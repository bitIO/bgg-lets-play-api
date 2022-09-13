/*
  Warnings:

  - You are about to drop the column `userCollectionId` on the `games` table. All the data in the column will be lost.
  - The primary key for the `user_collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `gameId` to the `user_collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_userCollectionId_fkey";

-- AlterTable
ALTER TABLE "games" DROP COLUMN "userCollectionId";

-- AlterTable
ALTER TABLE "user_collection" DROP CONSTRAINT "user_collection_pkey",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD CONSTRAINT "user_collection_pkey" PRIMARY KEY ("userId", "gameId");

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
