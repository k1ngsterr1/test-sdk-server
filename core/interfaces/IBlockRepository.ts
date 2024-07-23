import { BlockDetails } from "@core/utils/Block/types";
import { ErrorDetails } from "@core/utils/utils";
import { Block } from "@infrastructure/models/blockModel";

export interface IBlockRepository {
    create(blockDetails: BlockDetails, errors: ErrorDetails[]): Promise<void | null>;
    findById(id: number, errors: ErrorDetails[]): Promise<Block | null>;
    findBlocks(errors: ErrorDetails[]): Promise<Block[] | null>;
    deleteById(id: number, errors: ErrorDetails[]): Promise<void | null>;
}