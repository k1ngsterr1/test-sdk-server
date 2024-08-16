import { IImageRepository } from "@core/interfaces/IImageRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Image } from "@infrastructure/models/imageModel";
import { ImageRepository } from "@infrastructure/repositories/imageRepository";

export default class GetImages {
    private imageRepository: IImageRepository;
    constructor(){
        this.imageRepository = new ImageRepository();
    }
    async execute(errors: ErrorDetails[]): Promise<Image[]>{
        const images = await this.imageRepository.findImages(errors);

        return images;
    }
}