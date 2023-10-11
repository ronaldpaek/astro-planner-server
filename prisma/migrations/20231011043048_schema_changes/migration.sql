/*
  Warnings:

  - Added the required column `arrivalDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "checkIn" DROP NOT NULL,
ALTER COLUMN "checkIn" SET DATA TYPE TEXT,
ALTER COLUMN "checkOut" DROP NOT NULL,
ALTER COLUMN "checkOut" SET DATA TYPE TEXT,
DROP COLUMN "arrivalDate",
ADD COLUMN     "arrivalDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "departureDate",
ADD COLUMN     "departureDate" TIMESTAMP(3) NOT NULL;
