import knex from "knex";
import { env } from "../../utils/helpers.js";

const knexConfig = {
  client: "mysql2",
  connection: {
    host: env("DBHost"),
    port: 3306,
    user: env("DBUser"),
    password: env("DBPassword"),
    database: env("DBName"),
  },
};

const DB = knex(knexConfig);

export { DB };
