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

	@Column(DataType.STRING)
	font!: string;

	@Column(DataType.STRING)
	color!: string;

	@Column(DataType.STRING)
	link!: string;

	@Column(DataType.STRING)
	size!: string;
}