import { getRepository } from "typeorm";
import User from "../entity/User";

const fs = require("fs");
const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const pathToKey = path.join(__dirname, "..", "..", "KEYS", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

// app.js will pass the global passport object here, and this function will configure it
// eslint-disable-next-line no-unused-vars
module.exports = (passport: { use: (_: any) => void }) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async (jwtPayload: any, done: any) => {
      console.log((jwtPayload.exp - Date.now()) / 60000)
      if(jwtPayload.exp < Date.now()) return done("Bearer token is expired", false)
      const repository = getRepository(User);

      try {
        const user = await repository.findOne(jwtPayload.sub);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
