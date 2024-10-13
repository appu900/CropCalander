/*
  Warnings:

  - You are about to drop the column `agriexpertId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `commentedBy` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_agriexpertId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "agriexpertId",
ADD COLUMN     "commentedBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentedBy_fkey" FOREIGN KEY ("commentedBy") REFERENCES "AgriExpert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
