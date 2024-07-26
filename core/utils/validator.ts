import validator from "validator";

export async function validColor(value: string): Promise<boolean> {
  const errors = [];

  const hexColorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
  const rgbColorRegex =
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgbaColorRegex =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;

  if (
    !hexColorRegex.test(value) &&
    !rgbColorRegex.test(value) &&
    !rgbaColorRegex.test(value)
  ) {
    return false;
  }

  return true;
}

// Проверка валидности URL
export async function validURL(url: string): Promise<boolean> {
  if (!url) {
    return false;
  }
  if (
    validator.isURL(url, {
      protocols: ["https", "http"],
      require_valid_protocol: true,
      validate_length: true,
      allow_underscores: false,
      require_host: false,
      require_tld: false,
    })
  ) {
    return true;
  }
  return false;
}

export async function validSize(size: string): Promise<boolean> {
  if (size.length > 4) {
    return false;
  }
  if (size[0] >= "0" && size[0] <= "9" && size[1] >= "0" && size[1] <= "9") {
    if (
      !(size[0] >= "1" && size[0] <= "6" && size[1] >= "0" && size[1] <= "9")
    ) {
      return false;
    }
  } else {
    if (!(size[0] >= "6" && size[0] <= "9")) {
      return false;
    }
  }
  return true;
}
