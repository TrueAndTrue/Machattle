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
const DB_USER = "dsxhyebzxdqdfc";
const DB_PASS = "44e1a24702e6da77052894644edbc15b2b3837dd930082962cb398aef4bae2a6";
const sequelizeConfig = {
    dialect: 'postgres',
    logging: false
};
const sequelize = new sequelize_1.Sequelize('d918l45mrulfio', DB_USER, DB_PASS, sequelizeConfig);
exports.sequelize = sequelize;
