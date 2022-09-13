-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "plays" INTEGER,
    "publishedYear" INTEGER,
    "gameInfoId" INTEGER,
    "gameImageId" INTEGER,
    "gameMarketId" INTEGER,
    "gameRatingId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_info" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comments" INTEGER NOT NULL,
    "maxPlayTime" INTEGER NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "minPlayTime" INTEGER NOT NULL,
    "minPlayers" INTEGER NOT NULL,
    "numOwners" INTEGER NOT NULL,
    "playingTime" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "game_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_images" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "game_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_market" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "owned" INTEGER NOT NULL,
    "trading" INTEGER NOT NULL,
    "wanting" INTEGER NOT NULL,
    "whishing" INTEGER NOT NULL,

    CONSTRAINT "game_market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_rating" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "average" INTEGER NOT NULL,
    "bayesaverage" INTEGER NOT NULL,
    "median" INTEGER NOT NULL,
    "stddev" INTEGER NOT NULL,
    "users" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "game_rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plays" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "length" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "plays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "play_players" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "color" TEXT,
    "name" TEXT,
    "new" BOOLEAN,
    "rating" TEXT,
    "score" TEXT,
    "startposition" TEXT,
    "userid" INTEGER,
    "username" TEXT,
    "win" BOOLEAN,
    "playId" INTEGER,

    CONSTRAINT "play_players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "game_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_gameImageId_fkey" FOREIGN KEY ("gameImageId") REFERENCES "game_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_gameMarketId_fkey" FOREIGN KEY ("gameMarketId") REFERENCES "game_market"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_gameRatingId_fkey" FOREIGN KEY ("gameRatingId") REFERENCES "game_rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plays" ADD CONSTRAINT "plays_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plays" ADD CONSTRAINT "plays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "play_players" ADD CONSTRAINT "play_players_playId_fkey" FOREIGN KEY ("playId") REFERENCES "plays"("id") ON DELETE SET NULL ON UPDATE CASCADE;
