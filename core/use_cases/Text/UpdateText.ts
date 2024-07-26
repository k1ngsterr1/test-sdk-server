import { ITextRepository } from "@core/interfaces/ITextRepository";
import { UpdateTextRequest } from "@core/utils/Text/Request";
import { ErrorDetails, nullifyObjectProperties } from "@core/utils/utils";
import { validColor, validLink, validSize } from "@core/utils/validator";
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

    const text = await this.textRepository.findById(request.id, errors);

    if (request.content !== undefined) {
      text.content = request.content;
    }
    if (request.style !== undefined) {
      text.style = request.style;
    }
    if (request.font !== undefined) {
      text.font = request.font;
    }
    if (request.color !== undefined) {
      text.color = request.color;
    }
    if (request.link !== undefined) {
      await nullifyObjectProperties(text.link);

      if (request.link.email !== undefined) {
        text.link.email = request.link.email;
        text.link.value = `mailto:${text.link.email}`;

        if (request.link.subject !== undefined) {
          text.link.value += `?subject=${encodeURIComponent(
            text.link.subject
          )}`;
        }
      }
      if (request.link.url !== undefined) {
        text.link.url = request.link.url;
        text.link.value = request.link.url;

        if (request.link.anchor !== undefined) {
          text.link.anchor = request.link.anchor;
          text.link.value += `#${encodeURIComponent(text.link.anchor)}`;
        }
      }
      if (request.link.phoneNumber !== undefined) {
        text.link.phoneNumber = request.link.phoneNumber;
        text.link.value = text.link.phoneNumber;
      }
    }
    if (request.size !== undefined) {
      text.size = request.size;
    }

    await text.save();
  }
}
