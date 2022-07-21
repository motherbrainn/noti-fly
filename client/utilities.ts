const env = process.env.NODE_ENV;
const PROD_CLIENT_URL = process.env.NEXT_PUBLIC_PROD_CLIENT_URL;

export const clientUrl =
  env === "production" ? PROD_CLIENT_URL : "localhost:3000";
