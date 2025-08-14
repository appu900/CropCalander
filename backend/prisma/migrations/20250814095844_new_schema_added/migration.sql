-- AlterTable
ALTER TABLE "ExpertVisit" ADD COLUMN     "preferedVisitDate" TIMESTAMP(3),
ADD COLUMN     "soilType" "SoilType",
ADD COLUMN     "visitPurpose" TEXT;
