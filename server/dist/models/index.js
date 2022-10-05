"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
let sequelize;
exports.sequelize = sequelize;
if (process.env.HEROKU_POSTGRESQL_JADE_URL) {
    // the application is executed on Heroku ... use the postgres database
    exports.sequelize = sequelize = new sequelize_1.Sequelize(process.env.HEROKU_POSTGRESQL_JADE_URL, {
        dialect: "postgres",
        protocol: "postgres",
        port: 5432,
        host: "<heroku host>",
        logging: false
    });
}
else {
    // the application is executed on the local machine ... use mysql
    exports.sequelize = sequelize = new sequelize_1.Sequelize("codewars", 'postgres', 'password', {
        dialect: "postgres"
    });
}
