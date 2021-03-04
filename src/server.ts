import "reflect-metadata";
import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as Multer from "multer";
import Routes from "./routes";
import createLogger from "./utils/logger";
import { TryDBConnect } from "./db_helper/index";

const multerMid = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// === Initializing variables ===
const app: express.Application = express();
const logger = createLogger("Root");

const passport = require("passport");

require("./config/passport")(passport);

app.use(passport.initialize());

// === app.use() ===
app.use(multerMid.single("file"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

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

app.get("/", (req, res) => {
  res.send("Hello ANT");
});

// === Initializing all routes ===
Routes.forEach((route) => {
  (app as any)[route.method](
    `/api/v1${route.route}`,
    (req: Request, res: Response, next: Function) => {
      if (route.auth) {
        return route.auth(req, res, next);
      }
      return next();
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
