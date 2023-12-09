import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "murmur",
  apiKey: process.env.API_KEY,
});
