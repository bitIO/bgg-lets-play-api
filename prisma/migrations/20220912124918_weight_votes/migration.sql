/*
  Warnings:

  - Added the required column `weightVotes` to the `game_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_info" ADD COLUMN     "weightVotes" INTEGER NOT NULL;
