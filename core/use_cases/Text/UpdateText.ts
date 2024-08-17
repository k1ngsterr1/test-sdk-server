import { ITextRepository } from "@core/interfaces/ITextRepository";
import { UpdateTextRequest } from "@core/utils/Text/Request";
import { LinkDetails } from "@core/utils/Text/types";
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
      console.log(request.link);
      const isValidLink = await validLink(request.link);
      console.log(isValidLink);
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

    if (!text) {
      errors.push(new ErrorDetails(404, "Text not found."));
      return;
    }

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

    const newLink: LinkDetails = {
      value: null,
      email: null,
      url: null,
      phoneNumber: null,
      subject: null,
      anchor: null,
      blank: null,
    };

    if (request.link !== undefined) {
      if (request.link.value !== undefined) {
        newLink.value = request.link.value;
      } else if (request.link.email !== undefined) {
        newLink.email = request.link.email;
        newLink.subject = request.link.subject;
        newLink.value = `mailto:${newLink.email}?subject=${encodeURIComponent(
          newLink.subject
        )}`;
      } else if (request.link.url !== undefined) {
        newLink.url = request.link.url;
        newLink.value = request.link.url;

        if (request.link.anchor !== undefined) {
          newLink.anchor = request.link.anchor;
          newLink.value += `${encodeURIComponent(newLink.anchor)}`;
        }

        if (request.link.blank !== undefined) {
          newLink.blank = request.link.blank;
        }
      } else if (request.link.phoneNumber !== undefined) {
        newLink.phoneNumber = request.link.phoneNumber;
        newLink.value = newLink.phoneNumber;
      }
      text.link = newLink;
    }

    if (request.size !== undefined) {
      text.size = request.size;
    }

    if (request.width !== undefined) {
      text.width = request.width;
    }

    await text.save();
  }
}
