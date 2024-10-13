/*
  Warnings:

  - A unique constraint covering the columns `[postId,farmerId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId,agriExpertId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Like_postId_farmerId_key" ON "Like"("postId", "farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_postId_agriExpertId_key" ON "Like"("postId", "agriExpertId");
