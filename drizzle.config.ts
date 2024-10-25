
import { defineConfig } from "drizzle-kit";
import { env } from "./env.mjs";

// interface DbCredentials {
//   url?: string;
//   accountId?: string;
//   token?: string;
//   databaseId?: string;
// }


export default env.DB_LOCAL_PATH
  ? defineConfig({
      dialect: "sqlite",
      schema: "./src/server/db/schema.ts",
      dbCredentials: {
        url: env.DB_LOCAL_PATH,
      }
    })
  : defineConfig({
      schema: "./src/server/db/schema.ts",
      dialect: "sqlite",
      out: "./migrations",
      driver: "d1-http",
      dbCredentials: {
        accountId: env.CLOUDFLARE_ACCOUNT_ID!,
        token: env.CLOUDFLARE_API_TOKEN!,
        databaseId: env.DB_PROD_DATABASE_ID!,
      },
      tablesFilter: [`cloudflare_*`],
    });
