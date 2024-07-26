import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { AddBlockRequest } from "@core/utils/Block/Request";
import { BlockDetails } from "@core/utils/Block/types";
import { ErrorDetails } from "@core/utils/utils";
import { BlockRepository } from "@infrastructure/repositories/blockRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class AddBlock {
  private blockRepository: IBlockRepository;
  constructor() {
    this.blockRepository = new BlockRepository();
  }
  async execute(
    request: AddBlockRequest,
    errors: ErrorDetails[]
  ): Promise<void> {
    if (request.code !== Code) {
      errors.push(new ErrorDetails(403, "The website code is incorrect."));
      return;
    }

    const newBlock: BlockDetails = {
      name: request.name,
      anchor: request.anchor,
    };

    await this.blockRepository.create(newBlock, errors);
  }
}
