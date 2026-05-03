import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getOptionalRequestContext() {
  try {
    return getCloudflareContext();
  } catch {
    return null;
  }
}

export function getRequestContext() {
  return getCloudflareContext();
}
