/*
  Warnings:

  - Added the required column `farmerID` to the `CropHealthMonitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CropHealthMonitor" ADD COLUMN     "farmerID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CropHealthMonitor" ADD CONSTRAINT "CropHealthMonitor_farmerID_fkey" FOREIGN KEY ("farmerID") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
