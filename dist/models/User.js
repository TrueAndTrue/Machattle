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
        allowNull: false,
        unique: true
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
User.belongsToMany(User, { as: 'friends', through: 'UserFriends' });
//two 1-to-many associations between user and challanges
User.hasMany(Challenge_1.Challenge, {
    sourceKey: "uid",
    foreignKey: "winnerId",
    as: "WonChallenges",
});
User.hasMany(Challenge_1.Challenge, {
    sourceKey: "uid",
    foreignKey: "loserId",
    as: "LostChallenges"
});
Challenge_1.Challenge.belongsTo(User, { foreignKey: "winnerId" });
Challenge_1.Challenge.belongsTo(User, { foreignKey: "loserId" });
User.belongsToMany(Question_1.Question, { through: 'userQuestions' });
Question_1.Question.belongsToMany(User, { through: 'userQuestions' });
