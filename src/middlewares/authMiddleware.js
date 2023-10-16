import jwt from "jsonwebtoken";

import prisma from "../db/prismaClient.js";

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ success: false, error: "Authorization required" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, secret);

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).send({ success: false, error: "User not found" });
    }

    // Remove password from user object
    delete user.password;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
