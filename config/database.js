// @ts-nocheck
const path = require("path");

module.exports = ({ env }) => ({
  connection : {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST"),
      port: env("DATABASE_PORT"),
      database: env("DATABASE_CLIENT"),
      user: env("DATABASE_USER"),
      password: env("DATABASE_PASSWORD"),
      ssl: env.bool("DATABASE_SSL",false)
    },
    useNullAsDefault: true
  }
});