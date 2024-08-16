import { IImageRepository } from "@core/interfaces/IImageRepository";
import { ImageDetails } from "@core/utils/Image/types";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Image } from "@infrastructure/models/imageModel";

export class ImageRepository implements IImageRepository{
    async create(imageDetails: ImageDetails, errors: ErrorDetails[]): Promise<void | null>{
        try{
            await sequelize.getRepository(Image).create(imageDetails);
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error adding image to database"));
            return null;
        }
    }
    async findById(id: number, errors: ErrorDetails[]): Promise<Image>{
        try{
            const image = await sequelize.getRepository(Image).findByPk(id);

            if(!image){
                errors.push(new ErrorDetails(404, "Image not found"));
                return null;
            }

            return image;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting image from database"));
            return null;
        }
    }

    async findImages(errors: ErrorDetails[]): Promise<Image[]>{
        try{
            const images = await sequelize.getRepository(Image).findAll();
            
            if(!images){
                errors.push(new ErrorDetails(404, "Images not found"));
                return null;
            }

            return images;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error getting images from database"));
            return null;
        }
    }

    async deleteById(id: number, errors: ErrorDetails[]): Promise<void | null>{
        try{
            const image = await sequelize.getRepository(Image).findByPk(id);

            if(!image){
                errors.push(new ErrorDetails(404, "Image not found"));
                return null;
            }

            await image.destroy();
        }catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Error deleting image from database"));
            return null;
        }
    }
}