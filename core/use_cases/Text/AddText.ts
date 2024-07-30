import { ITextRepository } from "@core/interfaces/ITextRepository";
import { AddTextRequest } from "@core/utils/Text/Request";
import { TextDetails } from "@core/utils/Text/types";
import { ErrorDetails } from "@core/utils/utils";
import { validColor, validSize, validLink } from "@core/utils/validator";
import { TextRepository } from "@infrastructure/repositories/textRepository";
const Code: string = process.env.WEBSITE_CODE;

export default class AddText {
  private textRepository: ITextRepository;
  constructor() {
    this.textRepository = new TextRepository();
  }
  async execute(
    request: AddTextRequest,
    errors: ErrorDetails[]
  ): Promise<void> {
    if (request.code !== Code) {
      errors.push(new ErrorDetails(403, "The website code is incorrect."));
      return;
    }
    if (request.color !== undefined) {
      const isValidColor = await validColor(request.color);
      if (!isValidColor) {
        errors.push(new ErrorDetails(400, "Invalid color."));
        return;
      }
    }
    if (request.link !== undefined) {
      const isValidLink = await validLink(request.link);
      if (!isValidLink) {
        errors.push(new ErrorDetails(400, "Invalid link."));
        return;
      }
    }
    if (request.size !== undefined) {
      const isValidSize = await validSize(request.size);
      if (!isValidSize) {
        errors.push(new ErrorDetails(400, "Invalid size."));
        return;
      }
    }

    const newText: TextDetails = {
      content: request.content,

      style: request.style,

      font: request.font,

      color: request.color,

      link: {
        value: request.link.value || null,
        email: request.link.email || null,
        url: request.link.url || null,
        phoneNumber: request.link.phoneNumber || null,
        subject: request.link.subject || null,
        anchor: request.link.anchor || null,
        blank: request.link.blank || null,
      },

      size: request.size,

      width: request.width,
    };

    await this.textRepository.create(newText, errors);
  }
}
