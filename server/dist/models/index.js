'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config({
    path: '.env'
});
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || 'password';
const sequelizeConfig = {
    dialect: 'postgres',
    logging: false
};
const sequelize = new sequelize_1.Sequelize('codewars', DB_USER, DB_PASS, sequelizeConfig);
exports.sequelize = sequelize;
