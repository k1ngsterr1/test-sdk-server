import { TextDetails } from "@core/utils/Text/types";
import { ErrorDetails } from "@core/utils/utils";
import { Text } from "@infrastructure/models/textModel";

export interface ITextRepository {
    create(textDetails: TextDetails, errors: ErrorDetails[]): Promise<void | null>;
    findById(id: number, errors: ErrorDetails[]): Promise<Text | null>;
    findTexts(errors: ErrorDetails[]): Promise<Text[] | null>;
    deleteById(id: number, errors: ErrorDetails[]): Promise<void | null>;
}