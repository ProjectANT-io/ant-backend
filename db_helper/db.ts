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

  // const connection = true;

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      const connectionOptions = await getConnectionOptions();
      await createConnection(connectionOptions);
    }
    console.log("🌴 Database connection was successful!");
  } catch (e) {
    console.error("ERROR: Database connection failed!!", e);
    throw e;
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
