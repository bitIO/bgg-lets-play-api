/*
  Warnings:

  - Added the required column `minAge` to the `game_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_info" ADD COLUMN     "minAge" INTEGER NOT NULL;
