import { Server } from "http";
import { app } from "./app";
import {
  startDataSourceConnection,
  closeDataSourceConnection,
} from "./services/data-source";

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await startDataSourceConnection();
  } catch (error) {
    console.error(error);
  }

  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });

  process.on("SIGINT", async () => await stop(server, "SIGINT"));
};

/*
Graceful shutdown

SIGTERM : can be blocked, handled, and ignored. (polite)
          The shell command kill generates SIGTERM by default.

SIGINT: Ctrl + C . program interrupt




*/

const stop = async (server: Server, signalCode: string) => {
  console.info(`${signalCode} signal received.`);
  console.log("Closing http server.");
  server.close(async (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    await closeDataSourceConnection();
    console.log("Http server closed.");
    process.exit(0);
  });
};

start();
