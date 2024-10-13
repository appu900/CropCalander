/*
  Warnings:

  - You are about to drop the column `farmerId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `Comment` table. All the data in the column will be lost.
  - Made the column `agriExpertId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_agriExpertId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_farmerId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "farmerId",
DROP COLUMN "userType",
ALTER COLUMN "agriExpertId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_agriExpertId_fkey" FOREIGN KEY ("agriExpertId") REFERENCES "AgriExpert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
