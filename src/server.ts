import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { createLogger } from "./utils/logger";

(async () => {
  // read connection options from ormconfig file (or ENV variables)
  const connectionOptions = await getConnectionOptions();

  const logger = createLogger("Root");

  const connection = await createConnection(connectionOptions);
(async () => {

  const app = express();
  const port = process.env.PORT || 8080; // default port to listen

  app.use(bodyParser.json());

  // register express routes from defined application routes
  Routes.forEach((route) => {
    (app as any)[route.method](
      route.route,
      (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      }
    );
  });

  // Root URI call
  app.get("/", async (req, res) => {
    logger.info("connected with browser");
    res.status(200).send("Hello ANT");
  });

  // Start the Server
  app.listen(port, () => {
    logger.info(`server running http://localhost:${port}`);
    logger.info(`press CTRL+C to stop server`);
  });

  // insert new users for test
  await connection.manager.save(
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
    })
  );
  // .catch((error) => console.log(error));
})();
