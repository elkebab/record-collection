import React from "react";
import { FormControl, Select, Input, InputLabel } from "@material-ui/core";

interface OriginFilterProps {
  setOriginFilter: (filter: any) => void;
  clubs: string[];
  countries: string[];
}

export const OriginFilter = ({
  clubs,
  countries,
  setOriginFilter,
}: OriginFilterProps) => {
  const originFilterId = "owner-select";
  return (
    <FormControl>
      <InputLabel htmlFor={originFilterId}>Land/Klubb</InputLabel>
      <Select
        native
        defaultValue=""
        input={<Input id={originFilterId} />}
        onChange={(event) => setOriginFilter(event.target.value)}
      >
        <option value="" />
        <optgroup label="Land">
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </optgroup>
        <optgroup label="Klubb">
          {clubs.map((club) => (
            <option key={club} value={club}>
              {club}
            </option>
          ))}
        </optgroup>
      </Select>
    </FormControl>
  );
};
