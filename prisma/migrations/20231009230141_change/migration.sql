/*
  Warnings:

  - You are about to drop the column `details` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `adults` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `children` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `infants` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Preference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `checkIn` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkOut` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('NEW_YORK_CITY', 'LOS_ANGELES', 'CHICAGO', 'TORONTO');

-- DropForeignKey
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_tripId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropIndex
DROP INDEX "User_githubId_key";

-- DropIndex
DROP INDEX "User_googleId_key";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "details",
DROP COLUMN "type",
ADD COLUMN     "bookingConfirmation" TEXT,
ADD COLUMN     "checkIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkOut" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "adults",
DROP COLUMN "children",
DROP COLUMN "infants",
ADD COLUMN     "passengers" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubId",
DROP COLUMN "googleId",
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- DropTable
DROP TABLE "Preference";

-- DropTable
DROP TABLE "RefreshToken";

-- CreateTable
CREATE TABLE "HotelReservation" (
    "id" TEXT NOT NULL,
    "hotelName" TEXT,
    "hotelPhone" TEXT,
    "location" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "HotelReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightReservation" (
    "id" TEXT NOT NULL,
    "airlineName" TEXT NOT NULL,
    "flightNumber" TEXT,
    "reservationId" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,

    CONSTRAINT "FlightReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarReservation" (
    "id" TEXT NOT NULL,
    "agencyName" TEXT NOT NULL,
    "carType" TEXT,
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "CarReservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HotelReservation" ADD CONSTRAINT "HotelReservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightReservation" ADD CONSTRAINT "FlightReservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarReservation" ADD CONSTRAINT "CarReservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
