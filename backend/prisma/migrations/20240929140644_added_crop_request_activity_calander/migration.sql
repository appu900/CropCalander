-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'COMPLETED');

-- CreateTable
CREATE TABLE "CropCalandarRequest" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "expertId" INTEGER NOT NULL,
    "cropName" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "filedSize" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CropCalandarRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropCalandar" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "expertId" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CropCalandar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "calandarId" INTEGER NOT NULL,
    "activityName" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CropCalandarRequest_farmerId_status_idx" ON "CropCalandarRequest"("farmerId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "CropCalandar_requestId_key" ON "CropCalandar"("requestId");

-- CreateIndex
CREATE INDEX "Activity_calandarId_startDate_idx" ON "Activity"("calandarId", "startDate");

-- AddForeignKey
ALTER TABLE "CropCalandarRequest" ADD CONSTRAINT "CropCalandarRequest_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropCalandarRequest" ADD CONSTRAINT "CropCalandarRequest_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "AgriExpert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropCalandar" ADD CONSTRAINT "CropCalandar_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "CropCalandarRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropCalandar" ADD CONSTRAINT "CropCalandar_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "AgriExpert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_calandarId_fkey" FOREIGN KEY ("calandarId") REFERENCES "CropCalandar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
