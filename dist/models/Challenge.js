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
}, {
    tableName: "challenges",
    sequelize: index_1.sequelize,
});
Challenge.hasOne(Question_1.Question, { as: 'winner' });
Challenge.hasOne(Question_1.Question, { as: 'loser' });
Question_1.Question.belongsTo(Challenge);
