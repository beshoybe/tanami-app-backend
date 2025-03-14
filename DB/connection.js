import { Sequelize } from "sequelize";

// const sequelizeDb = new Sequelize("tanami", "tanami", "tanamipassword", {
//     host: "localhost",
//     dialect: "mysql",
//     logging: false,
// });


const sequelizeDb = new Sequelize("jvew5f58vk72hm84", "yw82de7mzayedo3n", "z0ae64y37t7n7uj2", {
  host: "ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
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

