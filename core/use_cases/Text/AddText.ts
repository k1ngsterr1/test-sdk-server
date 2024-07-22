import { ITextRepository } from "@core/interfaces/ITextRepository";
import { AddTextRequest } from "@core/utils/Text/Request";
import { TextDetails } from "@core/utils/Text/types";
import { ErrorDetails } from "@core/utils/utils";
import { TextRepository } from "@infrastructure/repositories/textRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class AddText{
    private textRepository: ITextRepository;
    constructor(){
        this.textRepository = new TextRepository();
    }
    async execute(request: AddTextRequest, errors: ErrorDetails[]): Promise<void> {
        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const newText: TextDetails = {
            content: request.content,

			style: request.style,

			font: request.font,

			color: request.color,

			link: request.link,

			size: request.size,
        }

        await this.textRepository.create(newText, errors);
    }
}