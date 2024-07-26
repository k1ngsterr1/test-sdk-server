import { TextAttributes } from "@core/utils/Text/types";
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "texts",
})
export class Text extends Model<TextAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.TEXT)
  content!: string;

  @Column(DataType.STRING)
  style!: string;

  @Default("'Open Sans', sans-serif")
  @Column(DataType.STRING)
  font!: string;

  @Default("#fff")
  @Column(DataType.STRING)
  color!: string;

  @Column(DataType.JSON)
  link!: {
    value: string;
    email: string;
    url: string;
    phoneNumber: string;
    subject: string;
    anchor: string;
    blank: boolean;
  };

  @Default("24px")
  @Column(DataType.STRING)
  size!: string;
}
