const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const env = process.env.NODE_ENV;

const pool =
  env === "production"
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Pool({
        user: process.env.DB_USER,
        host: "localhost",
        database: process.env.DB_NAME,
        password: process.env.DB_USER_PASSWORD,
        port: process.env.DB_PORT,
      });

module.exports = {
  pool,
};
