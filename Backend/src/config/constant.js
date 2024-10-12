import "dotenv/config";

export default {
  PORT: process.env.PORT || 7890,
  DB_LOCAL: process.env.DB_LOCAL,
  DB_URL: process.env.DB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLOUDINATY_CLOUD_NAME: process.env.CLOUDINATY_CLOUD_NAME,
  CLOUDINATY_API_KEY: process.env.CLOUDINATY_API_KEY,
  CLOUDINATY_API_SECRET: process.env.CLOUDINATY_API_SECRET,
};
