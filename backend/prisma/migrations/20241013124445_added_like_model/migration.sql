/*
  Warnings:

  - You are about to drop the column `commentedBy` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `userType` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_commentedBy_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "commentedBy",
ADD COLUMN     "agriExpertId" INTEGER,
ADD COLUMN     "farmerId" INTEGER,
ADD COLUMN     "userType" "UserType" NOT NULL;

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userType" "UserType" NOT NULL,
    "agriExpertId" INTEGER,
    "farmerId" INTEGER,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_agriExpertId_fkey" FOREIGN KEY ("agriExpertId") REFERENCES "AgriExpert"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_agriExpertId_fkey" FOREIGN KEY ("agriExpertId") REFERENCES "AgriExpert"("id") ON DELETE SET NULL ON UPDATE CASCADE;
