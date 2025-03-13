import { Sequelize } from "sequelize";

const sequelizeDb = new Sequelize("tanami", "tanami", "tanamipassword", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

const connectDb = async () => {
    try {
        await sequelizeDb.authenticate();
        await sequelizeDb.sync({alter: true});
        console.log("✅ Database connection established successfully.");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
};
// Sync database (only after models are initialized)

export { sequelizeDb, connectDb };
