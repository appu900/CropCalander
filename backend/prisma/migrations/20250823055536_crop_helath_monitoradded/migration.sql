-- CreateTable
CREATE TABLE "CropHealthMonitor" (
    "id" SERIAL NOT NULL,
    "farmerLocation" TEXT NOT NULL,
    "soilType" "SoilType" NOT NULL,
    "cropType" TEXT NOT NULL,
    "query" TEXT NOT NULL,

    CONSTRAINT "CropHealthMonitor_pkey" PRIMARY KEY ("id")
);
