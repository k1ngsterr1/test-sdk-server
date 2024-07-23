import { BlockDetails } from "./types";

export interface AddBlockRequest extends BlockDetails{
    code: string;
}

export interface DeleteBlockRequest{
    id: number;
    code: string;
}

export interface UpdateBlockRequest extends BlockDetails{
    id: number;
    code: string;
}