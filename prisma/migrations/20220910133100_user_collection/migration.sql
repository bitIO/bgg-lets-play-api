-- AlterTable
ALTER TABLE "games" ADD COLUMN     "userCollectionId" INTEGER;

-- CreateTable
CREATE TABLE "user_collection" (
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_collection_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_userCollectionId_fkey" FOREIGN KEY ("userCollectionId") REFERENCES "user_collection"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
