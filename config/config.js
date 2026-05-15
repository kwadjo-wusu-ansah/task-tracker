import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI || undefined,
  nodeEnv: process.env.NODE_ENV || "development",
};
