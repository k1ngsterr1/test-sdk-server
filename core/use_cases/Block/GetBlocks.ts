import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Block } from "@infrastructure/models/blockModel";
import { BlockRepository } from "@infrastructure/repositories/blockRepository";

export default class GetBlocks {
    private blockRepository: IBlockRepository;
    constructor(){
        this.blockRepository = new BlockRepository();
    }
    async execute(errors: ErrorDetails[]): Promise<Block[]>{
        const blocks = await this.blockRepository.findBlocks(errors);

        return blocks;
    }
}