-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_gameImageId_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_gameInfoId_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_gameMarketId_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_gameRatingId_fkey";

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "game_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_gameImageId_fkey" FOREIGN KEY ("gameImageId") REFERENCES "game_images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_gameMarketId_fkey" FOREIGN KEY ("gameMarketId") REFERENCES "game_market"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_gameRatingId_fkey" FOREIGN KEY ("gameRatingId") REFERENCES "game_rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;
