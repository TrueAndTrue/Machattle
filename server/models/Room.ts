import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./index";
import { IRoom } from "./types";

type RoomCreationAttributes = Optional<IRoom, "uid">;

class Room extends Model<IRoom, RoomCreationAttributes> {
  declare uid: string;
  declare roomId: string;
}

Room.init(
  {
    uid: {
      type: new DataTypes.ARRAY(DataTypes.STRING),
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "room",
    sequelize: sequelize,
    paranoid: true,
  }
);

export { Room };
