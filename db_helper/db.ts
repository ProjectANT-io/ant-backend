import {Connection, createConnection, getConnection, getConnectionOptions} from "typeorm";

export const DBConnect = async () => {
  const connection: Connection | undefined = getConnection();


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
    console.error('ERROR: Database connection failed!!', e);
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
    onError();
  }
};

