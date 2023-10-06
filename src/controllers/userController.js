import bcrypt from "bcryptjs";

import prisma from "../db/prismaClient.js";
import issueJWT from "../utils/jwt.js";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { token, expires } = issueJWT(user);
    const safeUser = {
      id: user.id,
      email: user.email,
    };

    res.json({
      success: true,
      user: safeUser, // Send only safe user data
      auth: {
        token,
        expires,
      },
    });
  } catch (err) {
    console.error(err);

    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check user existence and password validity
    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));
    
    if (!user || !isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const { token, expires } = issueJWT(user);
    const safeUser = {
      id: user.id,
      email: user.email,
    };

    res.json({
      success: true,
      user: safeUser, // Send only safe user data
      auth: {
        token,
        expires,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
