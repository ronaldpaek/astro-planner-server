/*
  Warnings:

  - You are about to drop the column `arrival` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `departure` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "arrival",
DROP COLUMN "departure",
ADD COLUMN     "arrivalA" TEXT,
ADD COLUMN     "arrivalB" TEXT,
ADD COLUMN     "departureA" TEXT,
ADD COLUMN     "departureB" TEXT;
