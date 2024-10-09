-- CreateTable
CREATE TABLE "FarmerCropCalendar" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "cropName" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "fieldSize" DOUBLE PRECISION NOT NULL,
    "seedVariety" TEXT,
    "location" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FarmerCropCalendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmerCropCalendarActivity" (
    "id" SERIAL NOT NULL,
    "farmerCropCalendarId" INTEGER NOT NULL,
    "activityName" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "FarmerCropCalendarActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FarmerCropCalendar" ADD CONSTRAINT "FarmerCropCalendar_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerCropCalendarActivity" ADD CONSTRAINT "FarmerCropCalendarActivity_farmerCropCalendarId_fkey" FOREIGN KEY ("farmerCropCalendarId") REFERENCES "FarmerCropCalendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
