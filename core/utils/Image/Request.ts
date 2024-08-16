import { ImageDetails } from "./types";

export interface AddImageRequest extends ImageDetails {
  code: string;
}

export interface DeleteImageRequest {
  id: number;
  code: string;
}

export interface UpdateImageRequest extends ImageDetails {
  id: number;
  code: string;
}
