/*
  Warnings:

  - You are about to drop the column `arrivalA` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `arrivalB` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `departureA` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `departureB` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "arrivalA",
DROP COLUMN "arrivalB",
DROP COLUMN "departureA",
DROP COLUMN "departureB",
ADD COLUMN     "arrivalAirport" TEXT,
ADD COLUMN     "arrivalDate" TEXT,
ADD COLUMN     "departureAirport" TEXT,
ADD COLUMN     "departureDate" TEXT;
