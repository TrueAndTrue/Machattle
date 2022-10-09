"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFriend = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class UserFriend extends sequelize_1.Model {
}
exports.UserFriend = UserFriend;
UserFriend.init({}, { tableName: "userFriends", sequelize: _1.sequelize, });
