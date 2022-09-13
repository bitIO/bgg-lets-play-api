/*
  Warnings:

  - Added the required column `fortrade` to the `user_game_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_game_status" ADD COLUMN     "fortrade" BOOLEAN NOT NULL;
