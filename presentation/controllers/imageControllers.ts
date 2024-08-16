import AddImage from "@core/use_cases/Image/AddImage";
import DeleteImage from "@core/use_cases/Image/DeleteImage";
import GetImages from "@core/use_cases/Image/GetImages";
import UpdateImage from "@core/use_cases/Image/UpdateImage";
import {
  AddImageRequest,
  DeleteImageRequest,
  UpdateImageRequest,
} from "@core/utils/Image/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";
class ImageController {
  private addImageUseCase: AddImage;
  private getImagesUseCase: GetImages;
  private deleteImageUseCase: DeleteImage;
  private updateImageUseCase: UpdateImage;
  constructor() {
    this.addImageUseCase = new AddImage();
    this.getImagesUseCase = new GetImages();
    this.deleteImageUseCase = new DeleteImage();
    this.updateImageUseCase = new UpdateImage();
  }
  async addImage(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddImageRequest = {
        code: req.body.code,
        url: req.body.image,
      };

      await this.addImageUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(201).json({ message: "Added image succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding the image." });
    }
  }

  async getImages(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const images = await this.getImagesUseCase.execute(errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ images: images });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error geting the images." });
    }
  }

  async deleteImage(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: DeleteImageRequest = {
        id: Number(req.params.id),
        code: req.params.code,
      };

      await this.deleteImageUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ message: "Deleted image succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting the image." });
    }
  }

  async updateImage(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: UpdateImageRequest = {
        id: Number(req.params.id),
        code: req.body.code,
        url: req.body.image,
      };

      await this.updateImageUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ message: "Updated image succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updateing the image." });
    }
  }
}

export default new ImageController();
