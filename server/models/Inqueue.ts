import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./index";
import { IQueue } from "./types";

type InqueueCreationAttributes = Optional<IQueue, "uid">;

class Inqueue extends Model<IQueue, InqueueCreationAttributes> {
  declare uid: string;
  declare roomId: string;
  declare rank: string[];
}

Inqueue.init(
  {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    }
  },
  {
    timestamps: false,
    tableName: "inqueue",
    sequelize: sequelize,
    paranoid: true,
  }
);

export { Inqueue };
