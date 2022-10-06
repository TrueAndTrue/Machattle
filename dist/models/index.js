"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const Question_1 = require("./Question");
let sequelize;
exports.sequelize = sequelize;
let models = [Question_1.Question];
exports.models = models;
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
if (process.env.HEROKU_POSTGRESQL_COBALT_URL) {
    // the application is executed on Heroku ... use the postgres database
    exports.sequelize = sequelize = new sequelize_1.Sequelize(process.env.HEROKU_POSTGRESQL_COBALT_URL, {
        dialect: "postgres",
        protocol: "postgres",
        port: 5432,
        host: "<heroku host>",
        logging: false
    });
}
else {
    const DB_NAME = process.env.DB_NAME || 'mechattle';
    const DB_USER = process.env.DB_USER || 'postgres';
    const DB_PASS = process.env.DB_PASS || 'password';
    // the application is executed on the local machine
    exports.sequelize = sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
        dialect: "postgres",
        logging: false
    });
}
