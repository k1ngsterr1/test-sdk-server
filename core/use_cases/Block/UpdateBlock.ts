import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { UpdateBlockRequest } from "@core/utils/Block/Request";
import { ErrorDetails } from "@core/utils/utils";
import { BlockRepository } from "@infrastructure/repositories/blockRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class UpdateBlock {
  private blockRepository: IBlockRepository;
  constructor() {
    this.blockRepository = new BlockRepository();
  }
  async execute(
    request: UpdateBlockRequest,
    errors: ErrorDetails[]
  ): Promise<void> {
    if (isNaN(request.id)) {
      errors.push(new ErrorDetails(400, "Invalid id."));
      return;
    }

    if (request.code !== Code) {
      errors.push(new ErrorDetails(403, "The website code is incorrect."));
      return;
    }
    if (request.anchor !== undefined && !request.anchor.startsWith("#")) {
      errors.push(new ErrorDetails(400, "Invalid anchor."));
      return;
    }

    const block = await this.blockRepository.findById(request.id, errors);

    if (request.name !== undefined) {
      request.name = block.name;
    }
    if (request.name !== undefined) {
      request.name = block.name;
    }

    await block.save();
  }
}
