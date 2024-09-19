import dotenv from "dotenv";
import { Client } from "pg";
import Colors from "colors";

dotenv.config();

interface DBConfig {
  user: string | undefined;
  host: string;
  database: string | undefined;
  password: string | undefined;
  port: number;
}

const user = process.env.POSTGRES_USER;
const database = process.env.POSTGRES_DB;
const password = process.env.POSTGRES_PASSWORD;

if (!user || !database || !password) {
  console.error(
    Colors.bgRed("Missing env variables for PostgreSQL configuration.")
  );
}

const dbConfig: DBConfig = {
  user: user,
  host: "localhost",
  database: database,
  password: password,
  port: 5432,
};

const client = new Client(dbConfig);

const ConnectToPostgres = async () => {
  try {
    console.log(process.env.POSTGRES_USER);
    client
      .connect()
      .then(() =>
        console.log(
          Colors.bold.bgGreen(
            ` Connected to PostgreSQL in port ${dbConfig.port} `
          )
        )
      );
  } catch (error) {
    console.log(Colors.bgRed("Error connecting to PostGres DB"));
  }
};

export default ConnectToPostgres;
