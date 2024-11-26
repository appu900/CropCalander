-- DropIndex
DROP INDEX "Farmer_email_key";

-- AlterTable
ALTER TABLE "Farmer" ALTER COLUMN "email" DROP NOT NULL;
