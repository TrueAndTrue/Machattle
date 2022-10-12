import { Model, Optional, DataTypes, Association } from "sequelize";
import { sequelize } from ".";

import { User } from "./User";

export class UserFriend extends Model {
  public static associations: {
    userId: Association<User, User>;
    friendID: Association<User, User>;
  };
}

UserFriend.init({}, { tableName: "userFriends", sequelize });
