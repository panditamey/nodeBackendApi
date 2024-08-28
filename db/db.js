import pkg from "pg";
import { config } from "dotenv";
config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  ssl: true,
  port: 5432,
});


export default pool;
