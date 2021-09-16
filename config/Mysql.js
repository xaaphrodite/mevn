const Sequelize = require("sequelize");

const HOST = process.env.DB_HOST;
const NAME = process.env.DB_DATABASE;
const USER = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(NAME, USER, PASSWORD, {
    host: HOST,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const DB = {};
DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

DB.users = require("../app/models/mysql/user")(sequelize, Sequelize);

module.exports = DB;
