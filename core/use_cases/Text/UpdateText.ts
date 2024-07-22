import { ITextRepository } from "@core/interfaces/ITextRepository";
import { UpdateTextRequest } from "@core/utils/Text/Request";
import { ErrorDetails } from "@core/utils/utils";
import { TextRepository } from "@infrastructure/repositories/textRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class UpdateText {
  private textRepository: ITextRepository;
  constructor() {
    this.textRepository = new TextRepository();
  }
  async execute(
    request: UpdateTextRequest,
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

    const text = await this.textRepository.findById(request.id, errors);

    if (request.content !== undefined) {
      request.content = text.content;
    }
    if (request.style !== undefined) {
      request.style = text.style;
    }
    if (request.font !== undefined) {
      request.font = text.font;
    }
    if (request.color !== undefined) {
      request.color = text.color;
    }
    if (request.link !== undefined) {
      request.link = text.link;
    }
    if (request.size !== undefined) {
      request.size = text.size;
    }

    await text.save();
  }
}
