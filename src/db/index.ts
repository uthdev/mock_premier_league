import { Connection, createConnection } from 'typeorm';
import { UserEntity } from './entity/User';

// import User from './entities/User';
// import UserSession from './entities/UserSession'

let connection: Connection;

export const initConnection = async (): Promise<Connection> => {
  connection = await createConnection({
    type: "mongodb",
    url: process.env.DATABASE_URL,
    entities: [UserEntity],
  });
  return connection;
};

const getConnection = () => connection

export default getConnection