import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions,
} from "typeorm";

export const DBConnect = async () => {
  let connection: Connection | undefined;
  try {
    connection = getConnection();
  } catch (e) {
    connection = undefined;
  }

  if (connection) {
    if (!connection.isConnected) {
      await connection.connect();
    }
  } else {
    await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: (process.env.DB_PORT as any) as number,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
      },
    });
  }
};

export const TryDBConnect = async (onError: Function, next?: Function) => {
  try {
    await DBConnect();
    if (next) {
      next();
    }
  } catch (e) {
    onError(e);
  }
};
