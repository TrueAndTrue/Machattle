"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const Challenge_1 = require("./Challenge");
const index_1 = require("./index");
const Question_1 = require("./Question");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    rank: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    image: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    rating: {
        type: new sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "users",
    sequelize: index_1.sequelize,
});
User.belongsToMany(User, { as: 'Friends', through: 'UserFriends' });
User.hasMany(Question_1.Question, {
    sourceKey: "id",
    foreignKey: "ownerId",
    as: "completedQuestions",
});
User.hasMany(Challenge_1.Challenge, {
    sourceKey: "id",
    foreignKey: "ownerId",
    as: "completedChallanges",
});
Challenge_1.Challenge.belongsTo(User, { foreignKey: "winner" });
Challenge_1.Challenge.belongsTo(User, { foreignKey: "loser" });
Question_1.Question.belongsTo(User, { foreignKey: "ownerId" });
