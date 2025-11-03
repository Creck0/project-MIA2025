export function normalizeImageUrl(url) {
  if (!url) return url;
  // If it comes from the seed and starts with /public, remove that prefix
  if (typeof url === "string" && url.startsWith("/public/")) {
    return url.replace("/public", "");
  }
  return url;
}
