-- AlterTable
ALTER TABLE "DroneSprayingFrom" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "ExpertVisit" ADD COLUMN     "pdf" TEXT,
ADD COLUMN     "status" "Formstatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "SoilHealthMapForm" ALTER COLUMN "status" SET DEFAULT 'PENDING';
