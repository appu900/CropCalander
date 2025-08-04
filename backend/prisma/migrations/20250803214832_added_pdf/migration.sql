/*
  Warnings:

  - Added the required column `pdf` to the `DroneSprayingFrom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `DroneSprayingFrom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `SoilHealthMapForm` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Formstatus" AS ENUM ('PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "DroneSprayingFrom" ADD COLUMN     "pdf" TEXT NOT NULL,
ADD COLUMN     "status" "Formstatus" NOT NULL;

-- AlterTable
ALTER TABLE "SmartIrrigationForm" ADD COLUMN     "pdf" TEXT,
ADD COLUMN     "status" "Formstatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "SoilHealthMapForm" ADD COLUMN     "pdf" TEXT,
ADD COLUMN     "status" "Formstatus" NOT NULL;
