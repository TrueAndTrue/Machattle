"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inqueue = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Inqueue extends sequelize_1.Model {
}
exports.Inqueue = Inqueue;
Inqueue.init({
    uid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    roomId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: "inqueue",
    sequelize: index_1.sequelize,
    paranoid: true
});
