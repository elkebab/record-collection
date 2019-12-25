import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function OriginFilter({ clubs, countries, setOriginFilter }) {
  const originFilterId = "owner-select";
  return (
    <FormControl>
      <InputLabel htmlFor={originFilterId}>Land/Klubb</InputLabel>
      <Select
        native
        defaultValue=""
        input={<Input id={originFilterId} />}
        onChange={event => setOriginFilter(event.target.value)}
      >
        <option value="" />
        <optgroup label="Land">
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </optgroup>
        <optgroup label="Klubb">
          {clubs.map(club => (
            <option key={club} value={club}>
              {club}
            </option>
          ))}
        </optgroup>
      </Select>
    </FormControl>
  );
}
