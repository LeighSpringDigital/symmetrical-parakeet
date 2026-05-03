// cache-bust-v2
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export const getDb = (d1: any) => drizzle(d1, { schema });

export type DbClient = ReturnType<typeof getDb>;
