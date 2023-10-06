import passport from "../config/passportConfig.js";

const authMiddleware = passport.authenticate("jwt", { session: false });

export default authMiddleware;
