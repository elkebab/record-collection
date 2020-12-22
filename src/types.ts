export interface Kit {
  id: string;
  country: string;
  club: string;
  version: string;
  longSleeve: boolean;
  year: string;
  playerName: string;
  playerNumber: string;
  signed: boolean;
  manufacturer: string;
  imageUrl: string;
  owner: string;
  description: string;
}

export interface JsonEditorGet {
  _id: string;
  _rev: string;
  name: string;
  data: Kit[];
  updated: string;
}
