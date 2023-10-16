import prisma from "../db/prismaClient.js";

export const getAllTrips = async (req, res, next) => {
  try {
    const trip = await prisma.trip.findMany();
    const data = {
      success: true,
      trip,
    };
    res.json({ data });
  } catch (error) {
    next(err);
  }
};

export const createTrip = async (req, res, next) => {
  console.log(req.user);
  try {
    const { checkIn, checkOut, passengers, location } = req.body;
    // const userId = req.user ? req.user.id : null;
    if (!location || !checkIn || !checkOut || !passengers) {
      return res.send({
        success: false,
        error: "You must provide all fields to create a trip",
      });
    }
    // if (!req.user) {
    //   return res.send({
    //     success: false,
    //     error: "Login to create a trip.",
    //   });
    // }
    const trip = await prisma.trip.create({
      data: {
        userId: req.user.id,
        checkIn,
        checkOut,
        location,
        passengers,
      },
    });
    res.json({
      success: true,
      trip,
    });
  } catch (error) {
    next(err);
  }
};

export const updateTrip = async (req, res, next) => {
  const { tripId } = req.params;
  const { checkIn, checkOut, passengers, location } = req.body;

  try {
    if (!location || !checkIn || !checkOut || !passengers) {
      return res.json({
        success: false,
        error: "You must provide all fields to create a trip",
      });
    }

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    });

    if (!trip) {
      return res.json({
        success: false,
        error: "Trip not found.",
      });
    }

    // if (!req.user) {
    //   return res.send({
    //     success: false,
    //     error: "Login to create a trip.",
    //   });
    // }

    if (req.user.id !== trip.userId) {
      return res.json({
        success: false,
        error: "You must be the owner of this trip to delete!",
      });
    }
    const updatedTrip = await prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        userId: req.user.id,
        checkIn,
        checkOut,
        location,
        passengers,
      },
    });
    res.json({
      success: true,
      updatedTrip,
    });
  } catch (error) {
    next(err);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    });

    if (!trip) {
      return res.json({
        success: false,
        error: "Trip not found.",
      });
    }

    if (req.user.id !== trip.userId) {
      return res.json({
        success: false,
        error: "You must be the owner of this trip to delete!",
      });
    }

    if (!req.user) {
      return res.json({
        success: false,
        error: "Please log in to delete a trip.",
      });
    }

    const deletedTrip = await prisma.trip.delete({
      where: {
        id: tripId,
      },
    });

    res.json({
      success: true,
      deletedTrip,
    });
  } catch (error) {
    next(err);
  }
};
