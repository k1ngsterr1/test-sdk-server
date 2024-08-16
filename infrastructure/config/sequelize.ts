import { Image } from "@infrastructure/models/imageModel";
import { Block } from "@infrastructure/models/blockModel";
import { Text } from "@infrastructure/models/textModel";
import { Sequelize } from "sequelize-typescript";

// Подключение к базе данных
const sequelize = new Sequelize({
  repositoryMode: true,
  database: "railway",
  host: "viaduct.proxy.rlwy.net",
  username: "postgres",
  password: "GehchlnVyVELywlzHNuWiJnGkDSdCKtn",
  port: 30528,
  dialect: "postgres",
  storage: ":memory:",
  logging: false,
  models: [Text, Block, Image],
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
