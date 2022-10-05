'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const url_1 = __importDefault(require("url"));
const dbConfig_1 = require("../config/dbConfig");
dotenv_1.default.config({
    path: '.env'
});
const config = dbConfig_1.allConfig['stage'];
const DB_USER = "dsxhyebzxdqdfc";
const DB_PASS = "44e1a24702e6da77052894644edbc15b2b3837dd930082962cb398aef4bae2a6";
const dbConfig = {
    dialect: 'postgres',
    logging: false
};
let sequelize;
exports.sequelize = sequelize;
const { DATABASE_URL } = process.env;
if (DATABASE_URL) {
    const dbUrl = url_1.default.parse(DATABASE_URL);
    if (dbUrl.auth && dbUrl.path) {
        const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
        const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
        const dbName = dbUrl.path.slice(1);
        const host = dbUrl.hostname;
        const { port } = dbUrl;
        exports.sequelize = sequelize = new sequelize_1.Sequelize(dbName, username, password, dbConfig);
    }
}
else {
    exports.sequelize = sequelize = new sequelize_1.Sequelize('codewars', 'postgres', 'password', dbConfig);
}
