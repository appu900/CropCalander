-- AlterTable
ALTER TABLE "CropHealthMonitor" ADD COLUMN     "pdf" TEXT,
ADD COLUMN     "status" "Formstatus" NOT NULL DEFAULT 'PENDING';
