/*
  Warnings:

  - A unique constraint covering the columns `[name,location,startsAt]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "coordinates" TEXT,
ADD COLUMN     "location" TEXT NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "events_name_location_startsAt_key" ON "events"("name", "location", "startsAt");
