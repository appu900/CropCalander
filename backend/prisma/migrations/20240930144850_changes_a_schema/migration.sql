-- DropForeignKey
ALTER TABLE "CropCalandarRequest" DROP CONSTRAINT "CropCalandarRequest_expertId_fkey";

-- AlterTable
ALTER TABLE "CropCalandarRequest" ALTER COLUMN "expertId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CropCalandarRequest" ADD CONSTRAINT "CropCalandarRequest_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "AgriExpert"("id") ON DELETE SET NULL ON UPDATE CASCADE;
