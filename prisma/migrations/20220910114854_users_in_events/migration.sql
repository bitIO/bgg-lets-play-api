-- AlterTable
ALTER TABLE "users" ADD COLUMN     "eventId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
