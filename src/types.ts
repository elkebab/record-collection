export enum RecordType {
  EP = "EP",
  LP = "LP",
  Other = "Other",
}

export interface Record {
  id: string;
  owner: string;
  album: string;
  band: string;
  year: string;
  genre: string;
  type: RecordType | "";
  signed: boolean;
  imageUrl: string;
  description: string;
}

export interface JsonEditorGet {
  _id: string;
  _rev: string;
  name: string;
  data: Record[];
  updated: string;
}
