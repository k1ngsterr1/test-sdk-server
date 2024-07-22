import { ITextRepository } from "@core/interfaces/ITextRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Text } from "@infrastructure/models/textModel";
import { TextRepository } from "@infrastructure/repositories/textRepository";

export default class GetTexts {
    private textRepository: ITextRepository;
    constructor(){
        this.textRepository = new TextRepository();
    }
    async execute(errors: ErrorDetails[]): Promise<Text[]>{
        const texts = await this.textRepository.findTexts(errors);

        return texts;
    }
}