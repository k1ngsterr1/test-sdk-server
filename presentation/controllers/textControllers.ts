import AddText from "@core/use_cases/Text/AddText";
import DeleteText from "@core/use_cases/Text/DeleteText";
import GetTexts from "@core/use_cases/Text/GetTexts";
import UpdateText from "@core/use_cases/Text/UpdateText";
import {
  AddTextRequest,
  DeleteTextRequest,
  UpdateTextRequest,
} from "@core/utils/Text/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";
class TextController {
  private addTextUseCase: AddText;
  private getTextsUseCase: GetTexts;
  private deleteTextUseCase: DeleteText;
  private updateTextUseCase: UpdateText;
  constructor() {
    this.addTextUseCase = new AddText();
    this.getTextsUseCase = new GetTexts();
    this.deleteTextUseCase = new DeleteText();
    this.updateTextUseCase = new UpdateText();
  }
  async addText(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddTextRequest = {
        code: req.body.code,
        content: req.body.content,
        style: req.body.style,
        font: req.body.font,
        color: req.body.color,
        link: req.body.link,
        size: req.body.size,
        width: req.body.width,
      };

      if (req.body.image !== undefined) {
        request.link.value = req.body.image;
      }

      await this.addTextUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(201).json({ message: "Added text succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding the text." });
    }
  }

  async getTexts(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const texts = await this.getTextsUseCase.execute(errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ texts: texts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error geting the texts." });
    }
  }

  async deleteText(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: DeleteTextRequest = {
        id: Number(req.params.id),
        code: req.params.code,
      };

      await this.deleteTextUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ message: "Deleted text succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting the text." });
    }
  }

  async updateText(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: UpdateTextRequest = {
        id: Number(req.params.id),
        code: req.body.code,
        content: req.body.content,
        style: req.body.style,
        font: req.body.font,
        color: req.body.color,
        link: req.body.link,
        size: req.body.size,
        width: req.body.width,
      };

      if (req.body.image !== undefined) {
        request.link.value = req.body.image;
      }

      await this.updateTextUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ message: "Updated text succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updateing the text." });
    }
  }
}

export default new TextController();
