import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { DeleteBlockRequest } from "@core/utils/Block/Request";
import { ErrorDetails } from "@core/utils/utils";
import { BlockRepository } from "@infrastructure/repositories/blockRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class DeleteBlock{
    private blockRepository: IBlockRepository;
    constructor(){
        this.blockRepository = new BlockRepository();
    }
    async execute(request: DeleteBlockRequest, errors: ErrorDetails[]): Promise<void | null>{
        if(isNaN(request.id)) {
            errors.push(new ErrorDetails(400, "Invalid id."));
            return;
        }

        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        await this.blockRepository.deleteById(request.id, errors);
    }
}