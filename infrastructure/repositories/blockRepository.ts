import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { BlockDetails } from "@core/utils/Block/types";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Block } from "@infrastructure/models/blockModel";

export class BlockRepository implements IBlockRepository{
    async create(blockDetails: BlockDetails, errors: ErrorDetails[]): Promise<void | null>{
        try{
            await sequelize.getRepository(Block).create(blockDetails);
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error adding block to database"));
            return null;
        }
    }
    async findById(id: number, errors: ErrorDetails[]): Promise<Block>{
        try{
            const block = await sequelize.getRepository(Block).findByPk(id);

            if(!block){
                errors.push(new ErrorDetails(404, "Block not found"));
                return null;
            }

            return block;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting block from database"));
            return null;
        }
    }

    async findBlocks(errors: ErrorDetails[]): Promise<Block[]>{
        try{
            const blocks = await sequelize.getRepository(Block).findAll();
            
            if(!blocks){
                errors.push(new ErrorDetails(404, "Blocks not found"));
                return null;
            }

            return blocks;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting blocks from database"));
            return null;
        }
    }

    async deleteById(id: number, errors: ErrorDetails[]): Promise<void | null>{
        try{
            const block = await sequelize.getRepository(Block).findByPk(id);

            if(!block){
                errors.push(new ErrorDetails(404, "Block not found"));
                return null;
            }

            await block.destroy();
        }catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error deleting block from database"));
            return null;
        }
    }
}