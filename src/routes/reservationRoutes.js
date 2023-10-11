import express from "express";
import prisma from "../db/prismaClient.js";

import * as userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();
router.use(authMiddleware);

export default router;

// GET / reservations;
router.get("/", async (req, res) => {
  try {
    const reservation = await prisma.reservation.findMany();
    const data = {
      success: true,
      reservation,
    };
    res.json({ data });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});
//  POST /reservations/flights

router.post("/flights/:tripId", async (req, res) => {
  const { tripId } = req.params;
  //console.log(req.user);
  try {
    const {
      arrivalDate,
      departureDate,
      airlineName,
      flightNumber,
      arrivalAirport,
      departureAirport,
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
        airlineName,
        flightNumber,
        arrivalDate,
        departureDate,
        arrivalAirport,
        departureAirport,
        tripId,
      },
    });

    res.send({
      success: true,
      reservation,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

//  PUT/reservations/flights

router.put("/flights/:reservationId", async (req, res) => {
  const { reservationId } = req.params;
  console.log(reservationId);
  try {
    const {
      arrivalDate,
      departureDate,
      airlineName,
      flightNumber,
      arrivalAirport,
      departureAirport,
      tripId,
    } = req.body;

    // if (!trip) {
    //   return res.send({
    //     success: false,
    //     error: "Trip not found.",
    //   });
    // }

    // if (req.user.id !== trip.userId) {
    //   return res.send({
    //     success: false,
    //     error: "You must be the owner of this trip to make a reservation!",
    //   });
    // }

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
    const reservation = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        userId: req.user.id,
        airlineName,
        flightNumber,
        arrivalDate,
        departureDate,
        arrivalAirport,
        departureAirport,
        tripId,
      },
    });

    res.send({
      success: true,
      reservation,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});
