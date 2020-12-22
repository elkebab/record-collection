import React from "react";
import { TextField } from "@material-ui/core";

interface PlayerFilterProps {
  setPlayerFilter: (filter: string) => void;
}

export const PlayerFilter = ({ setPlayerFilter }: PlayerFilterProps) => (
  <TextField
    label="Spiller"
    onChange={(event) => setPlayerFilter(event.target.value.toLowerCase())}
  />
);
