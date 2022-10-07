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
    as: "completedChallanges",
});
Question_1.Question.belongsTo(User, { foreignKey: "ownerId" });
