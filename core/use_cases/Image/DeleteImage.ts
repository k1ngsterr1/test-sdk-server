import { IImageRepository } from "@core/interfaces/IImageRepository";
import { DeleteImageRequest } from "@core/utils/Image/Request";
import { ErrorDetails } from "@core/utils/utils";
import { ImageRepository } from "@infrastructure/repositories/imageRepository";
import fs from "fs";
import path from "path";
import { uploadPath } from "server";
const Code: string = process.env.WEBSITE_CODE;

export default class DeleteImage {
  private imageRepository: IImageRepository;
  constructor() {
    this.imageRepository = new ImageRepository();
  }
  async execute(
    request: DeleteImageRequest,
    errors: ErrorDetails[]
  ): Promise<void | null> {
    if (isNaN(request.id)) {
      errors.push(new ErrorDetails(400, "Invalid id."));
      return;
    }

    if (request.code !== Code) {
      errors.push(new ErrorDetails(403, "The website code is incorrect."));
      return;
    }

    const image = await this.imageRepository.findById(request.id, errors);

    image.destroy();

    try {
      await fs.promises.unlink(path.join(uploadPath, image.url));
    } catch (error) {
      return;
    }
  }
}
