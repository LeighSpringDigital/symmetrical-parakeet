/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  DB: D1Database;
  BUCKET: R2Bucket;
  SITE_URL: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends CloudflareEnv {}
}

declare module "next" {
  interface NextApiRequest {
    env: CloudflareEnv;
  }
}
