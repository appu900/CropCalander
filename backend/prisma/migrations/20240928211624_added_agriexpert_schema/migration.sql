-- CreateTable
CREATE TABLE "AgriExpert" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "AgriExpert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgriExpert_email_key" ON "AgriExpert"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AgriExpert_phoneNumber_key" ON "AgriExpert"("phoneNumber");
