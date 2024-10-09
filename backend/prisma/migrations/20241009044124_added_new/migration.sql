/*
  Warnings:

  - You are about to drop the column `activityType` on the `FarmerCropCalendarActivity` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `FarmerCropCalendarActivity` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `FarmerCropCalendarActivity` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `FarmerCropCalendarActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `FarmerCropCalendarActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FarmerCropCalendar" ADD COLUMN     "projectDescription" TEXT,
ADD COLUMN     "projectName" TEXT;

-- AlterTable
ALTER TABLE "FarmerCropCalendarActivity" DROP COLUMN "activityType",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;
