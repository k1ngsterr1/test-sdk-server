import { Text } from "@infrastructure/models/textModel";
import { Sequelize } from "sequelize-typescript";

// Подключение к базе данных
const sequelize = new Sequelize({
  repositoryMode: true,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: 5432,
  dialect: "postgres",
  storage: ":memory:",
  logging: false,
  models: [Text],
});

export default sequelize;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error);
  });
