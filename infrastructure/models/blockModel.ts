import { BlockAttributes } from "@core/utils/Block/types";
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  tableName: "blocks",
})
export class Block extends Model<BlockAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  anchor!: string;
}
