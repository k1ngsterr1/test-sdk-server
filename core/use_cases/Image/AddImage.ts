import { IImageRepository } from "@core/interfaces/IImageRepository";
import { AddImageRequest } from "@core/utils/Image/Request";
import { ImageDetails } from "@core/utils/Image/types";
import { ErrorDetails } from "@core/utils/utils";
import { ImageRepository } from "@infrastructure/repositories/imageRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class AddImage{
    private imageRepository: IImageRepository;
    constructor(){
        this.imageRepository = new ImageRepository();
    }
    async execute(request: AddImageRequest, errors: ErrorDetails[]): Promise<void> {
        if(request.code !== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const newImage: ImageDetails = {
            url: request.url,
        }

        await this.imageRepository.create(newImage, errors);
    }
}