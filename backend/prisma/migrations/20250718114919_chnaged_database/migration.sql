/*
  Warnings:

  - Made the column `password` on table `Farmer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Farmer" ALTER COLUMN "password" SET NOT NULL;
