"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
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
User.belongsToMany(User, { as: 'Friends', through: 'UserFriends' });
User.hasMany(Question_1.Question, {
    sourceKey: "id",
    foreignKey: "ownerId",
    as: "completedQuestions",
});
// //two 1-to-many associations between user and challanges
// User.hasMany(Challenge, {
//   sourceKey: "uid",
//   foreignKey: "winnerId",
//   as: "WonChallanges",
// });
// User.hasMany(Challenge, {
//   sourceKey: "uid",
//   foreignKey: "loserId",
//   as: "LostChallanges",
// });
// Challenge.belongsToMany(User, {through : 'UserChallenge'});
// Challenge.belongsTo(User, { foreignKey: "winner"});
// Challenge.belongsTo(User, { foreignKey: "loser"});
Question_1.Question.belongsTo(User, { foreignKey: "ownerId" });
