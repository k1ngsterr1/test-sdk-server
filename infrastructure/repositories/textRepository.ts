import { ITextRepository } from "@core/interfaces/ITextRepository";
import { TextDetails } from "@core/utils/Text/types";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Text } from "@infrastructure/models/textModel";

export class TextRepository implements ITextRepository{
    async create(textDetails: TextDetails, errors: ErrorDetails[]): Promise<void | null>{
        try{
            await sequelize.getRepository(Text).create(textDetails);
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error adding text to database"));
            return null;
        }
    }
    async findById(id: number, errors: ErrorDetails[]): Promise<Text>{
        try{
            const text = await sequelize.getRepository(Text).findByPk(id);

            if(!text){
                errors.push(new ErrorDetails(404, "Text not found"));
                return null;
            }

            return text;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting text from database"));
            return null;
        }
    }

    async findTexts(errors: ErrorDetails[]): Promise<Text[]>{
        try{
            const texts = await sequelize.getRepository(Text).findAll();
            
            if(!texts){
                errors.push(new ErrorDetails(404, "Texts not found"));
                return null;
            }

            return texts;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting texts from database"));
            return null;
        }
    }

    async deleteById(id: number, errors: ErrorDetails[]): Promise<void | null>{
        try{
            const text = await sequelize.getRepository(Text).findByPk(id);

            if(!text){
                errors.push(new ErrorDetails(404, "Text not found"));
                return null;
            }

            await text.destroy();
        }catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error deleting text from database"));
            return null;
        }
    }
}