-- CreateEnum
CREATE TYPE "IrrigationType" AS ENUM ('DRIP', 'SPRINKLER', 'SURFACE', 'SUBSURFACE');

-- CreateEnum
CREATE TYPE "SoilType" AS ENUM ('LOAM', 'CLAY', 'SANDY', 'SILT', 'PEAT', 'CHALK');

-- CreateTable
CREATE TABLE "SmartIrrigationForm" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "irrigationType" "IrrigationType" NOT NULL,
    "farmLoaction" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "areaInHectares" DOUBLE PRECISION NOT NULL,
    "query" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SmartIrrigationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoilHealthMapForm" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "farmLoaction" TEXT NOT NULL,
    "soilType" "SoilType" NOT NULL,
    "cropType" TEXT NOT NULL,
    "areaInHectares" DOUBLE PRECISION NOT NULL,
    "query" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SoilHealthMapForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DroneSprayingFrom" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "farmLoaction" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "areaInHectares" DOUBLE PRECISION NOT NULL,
    "sprayDate" TIMESTAMP(3) NOT NULL,
    "query" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DroneSprayingFrom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SmartIrrigationForm" ADD CONSTRAINT "SmartIrrigationForm_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoilHealthMapForm" ADD CONSTRAINT "SoilHealthMapForm_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DroneSprayingFrom" ADD CONSTRAINT "DroneSprayingFrom_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
