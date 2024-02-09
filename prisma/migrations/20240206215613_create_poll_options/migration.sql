-- CreateTable
CREATE TABLE "pool_options" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,

    CONSTRAINT "pool_options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pool_options" ADD CONSTRAINT "pool_options_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
