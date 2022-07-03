import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "node-react",
  password: "postgrespass",
  port: 5432,
});

export { client };
