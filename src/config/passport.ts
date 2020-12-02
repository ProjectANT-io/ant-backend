import { getRepository } from "typeorm";
import User from "../entity/User";
import Employee from "../entity/Employee";

const fs = require("fs");
const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const pathToKey = path.join(__dirname, "..", "auth_keys", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport: { use: (arg0: any) => void }) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      console.log(jwtPayload);

      let repository = getRepository(User);

      if (jwtPayload.type === "user") {
        repository = getRepository(User);
      } else {
        repository = getRepository(Employee);
      }

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