import { ImageDetails } from "@core/utils/Image/types";
import { ErrorDetails } from "@core/utils/utils";
import { Image } from "@infrastructure/models/imageModel";

export interface IImageRepository {
    create(imageDetails: ImageDetails, errors: ErrorDetails[]): Promise<void | null>;
    findById(id: number, errors: ErrorDetails[]): Promise<Image | null>;
    findImages(errors: ErrorDetails[]): Promise<Image[] | null>;
    deleteById(id: number, errors: ErrorDetails[]): Promise<void | null>;
}