/*
  Warnings:

  - You are about to drop the column `postedBy` on the `Post` table. All the data in the column will be lost.
  - Added the required column `postedByType` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('FARMER', 'AGRI_EXPERT');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_postedBy_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postedBy",
ADD COLUMN     "agriExpertId" INTEGER,
ADD COLUMN     "farmerId" INTEGER,
ADD COLUMN     "postedByType" "UserType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_agriExpertId_fkey" FOREIGN KEY ("agriExpertId") REFERENCES "AgriExpert"("id") ON DELETE SET NULL ON UPDATE CASCADE;
