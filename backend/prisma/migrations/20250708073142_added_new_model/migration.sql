-- CreateTable
CREATE TABLE "ExpertVisit" (
    "id" SERIAL NOT NULL,
    "farmLocation" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "AreainHector" TEXT NOT NULL,
    "Query" TEXT NOT NULL,
    "farmerID" INTEGER NOT NULL,

    CONSTRAINT "ExpertVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpertVisit" ADD CONSTRAINT "ExpertVisit_farmerID_fkey" FOREIGN KEY ("farmerID") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
