"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const Challenge_1 = require("./Challenge");
const index_1 = require("./index");
const Question_1 = require("./Question");
const UserFriend_1 = require("./UserFriend");
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
//super many-to-many + self association
User.belongsToMany(User, { as: 'friends', through: 'userFriends' });
User.hasMany(UserFriend_1.UserFriend);
UserFriend_1.UserFriend.belongsTo(User);
//two 1-to-many associations between user and challanges
User.hasMany(Challenge_1.Challenge, {
    sourceKey: "id",
    foreignKey: "winnerId",
    as: "WonChallanges",
});
User.hasMany(Challenge_1.Challenge, {
    sourceKey: "id",
    foreignKey: "loserId",
    as: "LostChallanges",
});
Challenge_1.Challenge.belongsTo(User, { foreignKey: "winnerId" });
Challenge_1.Challenge.belongsTo(User, { foreignKey: "loserId" });
//many-to-many between user & friend
User.belongsToMany(Question_1.Question, { through: "userQuestion" });
Question_1.Question.belongsToMany(User, { through: "userQuestion" });
