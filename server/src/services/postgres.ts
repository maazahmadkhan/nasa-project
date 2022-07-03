import { Client } from "pg";
import { config } from "dotenv";

config();

const client = new Client();

export { client };
