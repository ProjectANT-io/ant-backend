import "reflect-metadata";
import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as bcrypt from "bcrypt";
import * as expressSession from "express-session";
import passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
import { getRepository } from "typeorm";
import { TryDBConnect } from "../db_helper/index";
import Routes from "./routes";
import createLogger from "./utils/logger";
import User from "./entity/User";
import Employee from "./entity/Employee";

// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

// === Initializing variables ===
const app: express.Application = express();
const logger = createLogger("Root");

// === app.use() ===
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(async (req: Request, res: Response, next) => {
  try {
    await TryDBConnect((e: Error) => {
      throw e;
    }, next);
  } catch (e) {
    res.status(500);
    res.json(e.message);
  }
});

// === Passport setup ===
app.use(
  expressSession({
    secret: "ant-secret-key-move-to-env-file-please",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req: any, email: string, password: string, done: Function) => {
      loginAttempt();
      async function loginAttempt() {
        const userRepository = getRepository(User);
        let user = await userRepository.find({
          where: {
            email: req.body.email,
          },
        });
        user.type = 'user';
        const employeeRepository = getRepository(Employee);
        const employee = await employeeRepository.find({
          where: {
            email: req.body.email,
          },
        });
        employee.type = 'employee';
        user.push(...employee);
        if (user.length === 0) {
          return done(null, false);
        } else {
          bcrypt.compare(password, user[0].password, (err, check) => {
            if (err) {
              return done();
            } else if (check) {
              console.log(user[0]);
              console.log(employee[0]);
              return done(null, user[0]);
            } else {
              return done(null, false);
            }
          });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// === Initializing all routes ===
Routes.forEach((route) => {
  (app as any)[route.method](
    `/api/v1${route.route}`,
    (req: Request, res: Response, next: Function) => {
      if (route.auth) {
        return route.auth(req, res, next);
      } else {
        next();
      }
    },
    (req: Request, res: Response, next: Function) => {
      const result = new (route.controller as any)()[route.action](
        req,
        res,
        next
      );
      if (result instanceof Promise) {
        result.then((routeResult) => res.send(routeResult));
      } else {
        res.json(result);
      }
    }
  );
});

// === Server Listening ===
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`server running http://localhost:${port}`);
  logger.info(`press CTRL+C to stop server`);
});
