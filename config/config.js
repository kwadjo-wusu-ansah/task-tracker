import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiSecret: process.env.API_SECRET,
  nodeEnv: process.env.NODE_ENV || "development",
};
