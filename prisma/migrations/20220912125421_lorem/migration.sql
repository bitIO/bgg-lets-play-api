/*
  Warnings:

  - You are about to drop the column `weightVotes` on the `game_info` table. All the data in the column will be lost.
  - Added the required column `weights` to the `game_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_info" DROP COLUMN "weightVotes",
ADD COLUMN     "weights" INTEGER NOT NULL;
