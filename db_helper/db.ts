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
    const connectionOptions = await getConnectionOptions();
    await createConnection(connectionOptions);
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
