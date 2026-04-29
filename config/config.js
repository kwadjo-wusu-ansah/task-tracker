import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  nodeEnv: process.env.NODE_ENV || "development",
};
