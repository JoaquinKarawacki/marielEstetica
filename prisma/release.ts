// Runs once on every container start (see package.json "start" script).
// Applies the schema to the mounted volume and seeds demo data only the
// very first time the database is empty, so a redeploy never wipes real
// client bookings that have accumulated since launch.
import "dotenv/config";
import { execSync } from "node:child_process";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

async function main() {
  console.log("→ Sincronizando esquema de base de datos...");
  execSync("npx prisma db push", { stdio: "inherit" });

  const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
  const prisma = new PrismaClient({ adapter });

  const count = await prisma.service.count();
  await prisma.$disconnect();

  if (count === 0) {
    console.log("→ Base de datos vacía, cargando datos de ejemplo...");
    execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
  } else {
    console.log(`→ Base de datos ya tiene ${count} servicio(s) cargado(s), omito el seed.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
