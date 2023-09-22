require("dotenv").config();

const dev = {
  app: { port: process.env.SERVER_PORT || 3002 },
  db: { url: process.env.DB_URL || "mongodb://localhost:27017/meories" },
};

module.exports = dev;
