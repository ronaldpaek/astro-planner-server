import prisma from "../db/prismaClient.js";

export const getAllReservations = async (req, res, next) => {
  try {
    const reservation = await prisma.reservation.findMany();
    const data = {
      success: true,
      reservation,
    };
    res.json({ data });
  } catch (error) {
    next(err);
  }
};

export const createReservation = async (req, res, next) => {
  try {
    const {
      bookingConfirmation,
      checkIn,
      checkOut,
      hotelName,
      hotelPhone,
      hotelLocation,
      airlineName,
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureDate,
      arrivalDate,
      carRentalAgency,
      carType,
      pickupLocation,
      dropoffLocation,
      tripId,
    } = req.body;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      return res.send({
        success: false,
        error: "Trip not found.",
      });
    }

    if (req.user.id !== trip.userId) {
      return res.send({
        success: false,
        error: "You must be the owner of this trip to make a reservation!",
      });
    }

    // const userId = req.user ? req.user.id : null;
    if (!arrivalDate || !departureDate) {
      return res.send({
        success: false,
        error: "You must provide all fields to create a flight reservation",
      });
    }
    if (!req.user) {
      return res.send({
        success: false,
        error: "Login to create a flight reservation.",
      });
    }
    const reservation = await prisma.reservation.create({
      data: {
        userId: req.user.id,
        bookingConfirmation,
        checkIn,
        checkOut,
        hotelName,
        hotelPhone,
        hotelLocation,
        airlineName,
        flightNumber,
        departureAirport,
        arrivalAirport,
        departureDate,
        arrivalDate,
        carRentalAgency,
        carType,
        pickupLocation,
        dropoffLocation,
        tripId,
      },
    });

    res.send({
      success: true,
      reservation,
    });
  } catch (error) {
    next(err);
  }
};

export const updateReservation = async (req, res, next) => {
  const { reservationId } = req.params;
  console.log(reservationId);
  try {
    const {
      bookingConfirmation,
      checkIn,
      checkOut,
      hotelName,
      hotelPhone,
      hotelLocation,
      airlineName,
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureDate,
      arrivalDate,
      carRentalAgency,
      carType,
      pickupLocation,
      dropoffLocation,
      tripId,
    } = req.body;

    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      return res.send({
        success: false,
        error: "Reservation not found.",
      });
    }

    if (req.user.id !== reservation.userId) {
      return res.send({
        success: false,
        error: "You must be the owner of this reservation to modify it!",
      });
    }

    if (!arrivalDate || !departureDate) {
      return res.send({
        success: false,
        error:
          "You must provide at least all mandatory fields to  modify a reservation",
      });
    }
    if (!req.user) {
      return res.send({
        success: false,
        error: "Login to modify a reservation.",
      });
    }
    const updatedReservation = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        userId: req.user.id,
        bookingConfirmation,
        checkIn,
        checkOut,
        hotelName,
        hotelPhone,
        hotelLocation,
        airlineName,
        flightNumber,
        departureAirport,
        arrivalAirport,
        departureDate,
        arrivalDate,
        carRentalAgency,
        carType,
        pickupLocation,
        dropoffLocation,
        tripId,
      },
    });

    res.send({
      success: true,
      updatedReservation,
    });
  } catch (error) {
    next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
    const { reservationId } = req.params;
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
    });

    if (!reservation) {
      return res.send({
        success: false,
        error: "Reservation not found.",
      });
    }

    if (req.user.id !== reservation.userId) {
      return res.send({
        success: false,
        error: "You must be the owner of this reservation to delete!",
      });
    }

    if (!req.user) {
      return res.send({
        success: false,
        error: "Please log in to delete a reservation.",
      });
    }

    const deletedReservation = await prisma.reservation.delete({
      where: {
        id: reservationId,
      },
    });

    res.send({
      success: true,
      deletedReservation,
    });
  } catch (error) {
    next(err);
  }
};
