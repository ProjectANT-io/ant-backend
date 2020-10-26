import "reflect-metadata";
import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import Routes from "./routes";
import { User } from "./entity/User";
import { createLogger } from "./utils/logger";
import { TryDBConnect } from "../db_helper/index";

// === Initializing variables ===
export const app: express.Application = express();
const logger = createLogger("Root");

// === app.use() ===
app.use(bodyParser.json());
app.use(async (req: Request, res: Response, next) => {
  await TryDBConnect(() => {
    res.json({
      error: "Database connection error, please try again later",
    });
  }, next);
});

// === Initializing all routes ===
Routes.forEach((route) => {
  (app as any)[route.method](
    `/api/v1${route.route}`,
    (req: Request, res: Response, next: Function) => {
      const result = new (route.controller as any)()[route.action](
        req,
        res,
        next
      );
      if (result instanceof Promise) {
        result.then((routeResult) =>
          routeResult !== null && routeResult !== undefined
            ? res.send(routeResult)
            : undefined
        );
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    }
  );
});

// TODO: Ideally Root URI should be put under routes.ts (Code refactoring purposes!!)
// Root URI call
app.get("/", async (req, res) => {
  logger.info("connected with browser");
  res.status(200).send("Hello ANT");
});

// === Server Listening ===
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`server running http://localhost:${port}`);
  logger.info(`press CTRL+C to stop server`);
});

// insert new users for test
// TODO: Testing for inserting new users should be in UserController.ts (Code refactoring purposes!!)
// Reference: https://typeorm.io/#/
/* await connection.manager.save(
    connection.manager.create(User, {
      firstName: "Timber",
      lastName: "Saw",
      age: 27,
    })
  );
  await connection.manager.save(
    connection.manager.create(User, {
      firstName: "Phantom",
      lastName: "Assassin",
      age: 24,
    }) */
