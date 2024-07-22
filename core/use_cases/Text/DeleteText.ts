import { ITextRepository } from "@core/interfaces/ITextRepository";
import { DeleteTextRequest } from "@core/utils/Text/Request";
import { ErrorDetails } from "@core/utils/utils";
import { TextRepository } from "@infrastructure/repositories/textRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class DeleteText{
    private textRepository: ITextRepository;
    constructor(){
        this.textRepository = new TextRepository();
    }
    async execute(request: DeleteTextRequest, errors: ErrorDetails[]): Promise<void | null>{
        if(isNaN(request.id)) {
            errors.push(new ErrorDetails(400, "Invalid id."));
            return;
        }

        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        await this.textRepository.deleteById(request.id, errors);
    }
}