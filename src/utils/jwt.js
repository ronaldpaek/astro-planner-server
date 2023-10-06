import jwt from "jsonwebtoken";
import ms from "ms";

const issueJWT = (user) => {
  const expiresIn = "1d";
  const secret = process.env.JWT_SECRET;

  const signedToken = jwt.sign({ id: user.id }, secret, {
    expiresIn,
  });

  const expires = Date.now() + ms(expiresIn); // Current time + 1 day in milliseconds

  return {
    token: "Bearer " + signedToken,
    expires, // This is a Unix timestamp in milliseconds
  };
};

export default issueJWT;
