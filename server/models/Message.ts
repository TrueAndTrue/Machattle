import { Model, Optional, DataTypes, ForeignKey } from "sequelize";
import { sequelize } from "./index";
import { IMessage } from "./types";

type MessageCreationAttributes = Optional<IMessage, "id">;

export class Message extends Model<IMessage, MessageCreationAttributes> {
  public id!: number;
  public title?: string;
  public content!: string;
  public read!:boolean
  public senderUsername!: ForeignKey<string>
  public receiverUsername!: ForeignKey<string>

  public readonly createdAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull :false
    },
    read :{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    senderUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "messages",
  }
);
