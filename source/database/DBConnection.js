import "dotenv/config.js";
import mysql from "mysql2/promise";
import { env } from "../../utils/helpers.js";

const connectionLimit = 10;
const queueLimit = 0;

const pool = mysql.createPool({
  user: env("DBUser"),
  password: env("DBPassword"),
  host: env("DBhost"),
  database: env("DBName"),
  waitForConnections: true,
  connectionLimit,
  queueLimit,
});

async function execute(query, values) {
  const connection = await pool.getConnection();
  if (!Array.isArray(values) && values != undefined) {
    values = Object.values(values);
  }
  const [results, fields] = await connection.query(query, values);
  pool.releaseConnection(connection);
  return [results, fields];
}
export { execute };
