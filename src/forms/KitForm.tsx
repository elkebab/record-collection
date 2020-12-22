import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import {
  TextField,
  makeStyles,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  DialogActions,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { createKit, updateKit } from "../api";
import { Kit } from "../types";
import { kitValidationSchema } from "./KitValidationSchema";

const MAX_IMG_SIZE = 800 * 800;

const useStyles = makeStyles({
  field: {
    marginTop: "0.8rem",
  },
  error: {
    color: "red",
  },
});

const emptyKitValues: Kit = {
  id: "",
  country: "",
  club: "",
  version: "",
  longSleeve: false,
  year: "",
  playerName: "",
  playerNumber: "",
  signed: false,
  manufacturer: "",
  imageUrl: "",
  owner: localStorage.getItem("owner") || "",
  description: "",
};

interface NewKitFormProps {
  extractedValues: any;
  closeModal: () => void;
  selectedKit?: Kit;
}

export const NewKitForm = ({
  extractedValues,
  closeModal,
  selectedKit,
}: NewKitFormProps) => {
  const classes = useStyles();

  const initialValues = selectedKit ? selectedKit : emptyKitValues;

  const submitKit = async (values: Kit) => {
    const kit: Kit = {
      ...values,
      playerNumber: `${values.playerNumber}`,
    };

    // Update kit if it has an ID. Create new kit otherwise.
    const response = kit.id ? await updateKit(kit) : await createKit(kit);
    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={kitValidationSchema}
      validateOnChange={false}
      onSubmit={submitKit}
    >
      {({ setFieldValue }) => (
        <Form>
          <Field name="owner" type="text">
            {({ field }: FieldProps<string>) => (
              <>
                <Autocomplete
                  fullWidth
                  options={extractedValues.allOwners}
                  freeSolo
                  defaultValue={field.value}
                  onChange={(_, value) => {
                    setFieldValue(field.name, value);
                    if (value) {
                      localStorage.setItem("owner", value);
                    } else {
                      localStorage.removeItem("owner");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      type="text"
                      label="Eier"
                      required
                      {...params}
                      {...field}
                    />
                  )}
                />

                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </>
            )}
          </Field>

          <Field name="country">
            {({ field }: FieldProps<string>) => (
              <div className={classes.field}>
                <Autocomplete
                  fullWidth
                  options={extractedValues.allCountries}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      type="text"
                      label="Land"
                      required
                      {...params}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>

          <Field name="club">
            {({ field }: FieldProps<string>) => (
              <div className={classes.field}>
                <Autocomplete
                  fullWidth
                  options={extractedValues.allClubs}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField type="text" label="Lag" {...field} {...params} />
                  )}
                />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>

          <Field name="version">
            {({ field }: FieldProps<string>) => (
              <div className={classes.field}>
                <Autocomplete
                  fullWidth
                  options={extractedValues.allVersions}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      type="text"
                      label="Versjon"
                      required
                      {...params}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>

          <Field name="year">
            {({ field }: FieldProps<string>) => (
              <div className={classes.field}>
                <TextField
                  type="text"
                  label="År"
                  required
                  {...field}
                  helperText='Eksempel: "2015" eller "2017/2018"'
                />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>

          <Field name="manufacturer">
            {({ field }: FieldProps<string>) => (
              <div className={classes.field}>
                <Autocomplete
                  fullWidth
                  options={extractedValues.allManufacturers}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      type="text"
                      label="Leverandør"
                      required
                      {...field}
                      {...params}
                    />
                  )}
                />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>

          <Field name="playerName">
            {({ field }: FieldProps<string>) => (
              <div className={classes.field}>
                <TextField
                  type="text"
                  label="Spillernavn"
                  fullWidth
                  {...field}
                />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>

          <Field name="playerNumber">
            {({ field }: FieldProps<string>) => (
              <div className={classes.field}>
                <TextField
                  type="number"
                  label="Spillernummer"
                  inputProps={{
                    min: "1",
                    max: "99",
                  }}
                  {...field}
                />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>

          <Field name="signed">
            {({
              field: { name, value },
              form: { setFieldValue },
            }: FieldProps<string>) => (
              <div className={classes.field}>
                <FormLabel component="legend">Signert</FormLabel>
                <RadioGroup
                  row
                  value={value ? "true" : "false"}
                  onChange={(event) =>
                    setFieldValue(name, event.target.value === "true")
                  }
                >
                  <FormControlLabel
                    control={<Radio color="primary" value="false" />}
                    label="Nei"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" value="true" />}
                    label="Ja"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </div>
            )}
          </Field>

          <Field name="longSleeve">
            {({
              field: { name, value },
              form: { setFieldValue },
            }: FieldProps<string>) => (
              <div className={classes.field}>
                <FormLabel component="legend">Ermer</FormLabel>
                <RadioGroup
                  value={value ? "true" : "false"}
                  onChange={(event) =>
                    setFieldValue(name, event.target.value === "true")
                  }
                  row
                >
                  <FormControlLabel
                    control={<Radio color="primary" value="false" />}
                    label="Kort"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" value="true" />}
                    label="Lang"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </div>
            )}
          </Field>

          <Field name="description">
            {({ field }: FieldProps<string>) => (
              <TextField
                type="text"
                label="Beskrivelse"
                fullWidth
                multiline
                {...field}
              />
            )}
          </Field>

          <Field name="imageUrl">
            {({
              field,
              form: { setFieldError },
              meta: { error },
            }: FieldProps<string>) => (
              <div className={classes.field}>
                <TextField
                  type="text"
                  label="Bilde-URL"
                  fullWidth
                  multiline
                  {...field}
                />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
                {field.value && !error && (
                  <img
                    className={classes.error}
                    src={field.value}
                    onError={() =>
                      setFieldError(
                        field.name,
                        "Kunne ikke laste bilde fra denne URL-en :'("
                      )
                    }
                    onLoad={({ target: { width, height } }: any) => {
                      if (width * height > MAX_IMG_SIZE) {
                        setFieldError(field.name, "Bildet er for stort :(");
                      } else {
                        setFieldError(field.name, undefined);
                      }
                    }}
                    alt=" "
                  />
                )}
              </div>
            )}
          </Field>
          <DialogActions className={classes.field}>
            <Button onClick={closeModal}>Avbryt</Button>
            <Button type="submit" variant="contained" color="primary">
              Lagre
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default NewKitForm;
