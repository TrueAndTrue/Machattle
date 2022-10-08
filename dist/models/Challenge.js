"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challenge = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const Question_1 = require("./Question");
class Challenge extends sequelize_1.Model {
}
exports.Challenge = Challenge;
Challenge.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tie: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    winnerId: {
        type: sequelize_1.DataTypes.STRING
    },
    loserId: {
        type: sequelize_1.DataTypes.STRING
    },
    questionId: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: "challenges",
    sequelize: index_1.sequelize,
});
Challenge.belongsTo(Question_1.Question);
Question_1.Question.hasMany(Challenge, { foreignKey: 'questionId' });
