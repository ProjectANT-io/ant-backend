import {Connection, createConnection, getConnection, getConnectionOptions} from "typeorm";
// import ORMConfig from "../src/ormconfig.json";

export const DBConnect = async () => {
  let connection: Connection | undefined;
//   console.log("Connection is " + connection);
  try {
    // console.log("Connection Before: " + connection);
    connection = getConnection();
    // console.log("Connection After: " + connection);
  } catch (e) {
  }

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

