import { config } from "dotenv";

export function loadEnv() {
  console.log("NODE_ENV value: ", process.env.NODE_ENV);
  const env = process.env.NODE_ENV || "dev";

  console.log("file parsed: ", `.env.${env}`);
  const envPath = `.env.${env}`;
  config({ path: envPath });
}
