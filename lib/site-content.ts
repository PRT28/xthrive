import "server-only";

import siteContent from "@/data/site-content.json";

export async function readSiteContent<T>() {
  return siteContent as T;
}
