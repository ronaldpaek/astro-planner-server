/*
  Warnings:

  - You are about to drop the `CarReservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlightReservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HotelReservation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CarReservation" DROP CONSTRAINT "CarReservation_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "FlightReservation" DROP CONSTRAINT "FlightReservation_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "HotelReservation" DROP CONSTRAINT "HotelReservation_reservationId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "airlineName" TEXT,
ADD COLUMN     "arrival" TEXT,
ADD COLUMN     "carRentalAgency" TEXT,
ADD COLUMN     "carType" TEXT,
ADD COLUMN     "departure" TEXT,
ADD COLUMN     "dropoffLocation" TEXT,
ADD COLUMN     "flightNumber" TEXT,
ADD COLUMN     "hotelLocation" TEXT,
ADD COLUMN     "hotelName" TEXT,
ADD COLUMN     "hotelPhone" TEXT,
ADD COLUMN     "pickupLocation" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CarReservation";

-- DropTable
DROP TABLE "FlightReservation";

-- DropTable
DROP TABLE "HotelReservation";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
