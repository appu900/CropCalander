-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "Otp" TEXT,
ADD COLUMN     "OtpExpireTime" TIMESTAMP(3),
ALTER COLUMN "password" DROP NOT NULL;
