import "dotenv/config";
import { randomUUID } from "crypto";
import type { Environment } from "vitest/environments";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateDatabaseUrl = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Plase provide a DATABASE_URL enviroment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);

  return url.toString();
};

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseUrl = generateDatabaseUrl(schema);
    process.env.DATABASE_URL = databaseUrl;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
