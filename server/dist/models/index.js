'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dbConfig = {
    dialect: 'postgres',
    logging: false
};
const sequelize = new sequelize_1.Sequelize("d918l45mrulfio", "dsxhyebzxdqdfc", "44e1a24702e6da77052894644edbc15b2b3837dd930082962cb398aef4bae2a6", dbConfig);
exports.sequelize = sequelize;
