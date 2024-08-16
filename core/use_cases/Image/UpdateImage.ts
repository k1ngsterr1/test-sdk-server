import { IImageRepository } from "@core/interfaces/IImageRepository";
import { UpdateImageRequest } from "@core/utils/Image/Request";
import { ErrorDetails } from "@core/utils/utils";
import { ImageRepository } from "@infrastructure/repositories/imageRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class UpdateImage{
    private imageRepository: IImageRepository;
    constructor() {
        this.imageRepository = new ImageRepository();
    }
    async execute(request: UpdateImageRequest, errors: ErrorDetails[]): Promise<void>{
        if(isNaN(request.id)) {
            errors.push(new ErrorDetails(400, "Invalid id."));
            return;
        }

        if(request.code!== Code){
            errors.push(new ErrorDetails(403, "The website code is incorrect."));
            return;
        }

        const image = await this.imageRepository.findById(request.id, errors);
        
        image.url = request.url;
        
        await image.save();
    }
}