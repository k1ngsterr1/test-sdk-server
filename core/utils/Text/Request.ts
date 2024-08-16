import { TextDetails } from "./types";

export interface AddTextRequest extends TextDetails {
  code: string;
}

export interface DeleteTextRequest {
  id: number;
  code: string;
}

export interface UpdateTextRequest extends Partial<TextDetails> {
  id: number;
  code: string;
}
