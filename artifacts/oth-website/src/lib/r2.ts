export async function uploadToR2(bucket: R2Bucket, file: File, path: string) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    await bucket.put(path, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    });
    return path;
  } catch (e) {
    console.error("R2 Upload Error:", e);
    throw new Error("Failed to upload to storage");
  }
}

export function getR2Url(path: string) {
  // Usually R2 is served via a custom domain or Cloudflare Worker
  return `/api/media/${path}`;
}
