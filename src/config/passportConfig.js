import dotenv from "dotenv";
import passport from "passport";
import JwtStrategy from "passport-jwt";

import prisma from "../db/prismaClient.js";

dotenv.config();
const { ExtractJwt, Strategy } = JwtStrategy;
const secret = process.env.JWT_SECRET;

// JWT Strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (user) {
        const cleanUser = {
          id: user.id,
          email: user.email,
        };
        
        return done(null, cleanUser);
      }

      return done(null, false);
    } catch (err) {
      console.log('hi')
      console.error(err);
      return done(err, false);
    }
  })
);

export default passport;
