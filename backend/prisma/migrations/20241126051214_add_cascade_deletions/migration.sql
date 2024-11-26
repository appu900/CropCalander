/*
  Warnings:

  - You are about to drop the `CropCalandar` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `Farmer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_calandarId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_agriExpertId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "CropCalandar" DROP CONSTRAINT "CropCalandar_expertId_fkey";

-- DropForeignKey
ALTER TABLE "CropCalandar" DROP CONSTRAINT "CropCalandar_requestId_fkey";

-- DropForeignKey
ALTER TABLE "CropCalandarRequest" DROP CONSTRAINT "CropCalandarRequest_expertId_fkey";

-- DropForeignKey
ALTER TABLE "CropCalandarRequest" DROP CONSTRAINT "CropCalandarRequest_farmerId_fkey";

-- DropForeignKey
ALTER TABLE "DroneSprayingFrom" DROP CONSTRAINT "DroneSprayingFrom_farmerId_fkey";

-- DropForeignKey
ALTER TABLE "FarmerCropCalendar" DROP CONSTRAINT "FarmerCropCalendar_farmerId_fkey";

-- DropForeignKey
ALTER TABLE "FarmerCropCalendarActivity" DROP CONSTRAINT "FarmerCropCalendarActivity_farmerCropCalendarId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_agriExpertId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_farmerId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_agriExpertId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_farmerId_fkey";

-- DropForeignKey
ALTER TABLE "SmartIrrigationForm" DROP CONSTRAINT "SmartIrrigationForm_farmerId_fkey";

-- DropForeignKey
ALTER TABLE "SoilHealthMapForm" DROP CONSTRAINT "SoilHealthMapForm_farmerId_fkey";

-- AlterTable
ALTER TABLE "Farmer" ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "CropCalandar";

-- CreateTable
CREATE TABLE "CropCalendar" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "expertId" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CropCalendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeleteAccountFeedback" (
    "id" SERIAL NOT NULL,
    "farmerEmail" TEXT NOT NULL,
    "farmerPhoneNumber" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "DeleteAccountFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CropCalendar_requestId_key" ON "CropCalendar"("requestId");

-- AddForeignKey
ALTER TABLE "SmartIrrigationForm" ADD CONSTRAINT "SmartIrrigationForm_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoilHealthMapForm" ADD CONSTRAINT "SoilHealthMapForm_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DroneSprayingFrom" ADD CONSTRAINT "DroneSprayingFrom_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_agriExpertId_fkey" FOREIGN KEY ("agriExpertId") REFERENCES "AgriExpert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_agriExpertId_fkey" FOREIGN KEY ("agriExpertId") REFERENCES "AgriExpert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_agriExpertId_fkey" FOREIGN KEY ("agriExpertId") REFERENCES "AgriExpert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerCropCalendar" ADD CONSTRAINT "FarmerCropCalendar_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerCropCalendarActivity" ADD CONSTRAINT "FarmerCropCalendarActivity_farmerCropCalendarId_fkey" FOREIGN KEY ("farmerCropCalendarId") REFERENCES "FarmerCropCalendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropCalandarRequest" ADD CONSTRAINT "CropCalandarRequest_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropCalandarRequest" ADD CONSTRAINT "CropCalandarRequest_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "AgriExpert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropCalendar" ADD CONSTRAINT "CropCalendar_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "CropCalandarRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropCalendar" ADD CONSTRAINT "CropCalendar_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "AgriExpert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_calandarId_fkey" FOREIGN KEY ("calandarId") REFERENCES "CropCalendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
