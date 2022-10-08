"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Question extends sequelize_1.Model {
}
exports.Question = Question;
Question.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ownerId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    question: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    tests: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false
    },
    difficulty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: index_1.sequelize,
    tableName: 'questions'
});
