import AddBlock from "@core/use_cases/Block/AddBlock";
import DeleteBlock from "@core/use_cases/Block/DeleteBlock";
import GetBlocks from "@core/use_cases/Block/GetBlocks";
import UpdateBlock from "@core/use_cases/Block/UpdateBlock";
import {
  AddBlockRequest,
  DeleteBlockRequest,
  UpdateBlockRequest,
} from "@core/utils/Block/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";
class BlockController {
  private addBlockUseCase: AddBlock;
  private getBlocksUseCase: GetBlocks;
  private deleteBlockUseCase: DeleteBlock;
  private updateBlockUseCase: UpdateBlock;
  constructor() {
    this.addBlockUseCase = new AddBlock();
    this.getBlocksUseCase = new GetBlocks();
    this.deleteBlockUseCase = new DeleteBlock();
    this.updateBlockUseCase = new UpdateBlock();
  }
  async addBlock(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddBlockRequest = {
        code: req.body.code,
        name: req.body.name,
        anchor: req.body.anchor,
      };

      await this.addBlockUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(201).json({ message: "Added block succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding the block." });
    }
  }

  async getBlocks(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const blocks = await this.getBlocksUseCase.execute(errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ blocks: blocks });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error geting the blocks." });
    }
  }

  async deleteBlock(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: DeleteBlockRequest = {
        id: Number(req.params.id),
        code: req.params.code,
      };

      await this.deleteBlockUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ message: "Deleted block succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting the block." });
    }
  }

  async updateBlock(req: Request, res: Response): Promise<any> {
    const errors: ErrorDetails[] = [];
    try {
      const request: UpdateBlockRequest = {
        id: Number(req.params.id),
        code: req.body.code,
        name: req.body.name,
        anchor: req.body.anchor,
      };

      await this.updateBlockUseCase.execute(request, errors);

      if (errors.length > 0) {
        return res.status(errors[0].code).json({ message: errors[0].details });
      }

      res.status(200).json({ message: "Updated block succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updateing the block." });
    }
  }
}

export default new BlockController();
