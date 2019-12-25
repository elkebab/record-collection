import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
import * as Yup from "yup";
import { addKit } from "../api";

const useStyles = makeStyles({
  field: {
    marginTop: "1rem",
  },
  error: {
    color: "red",
  },
});

const initialValues = {
  country: "",
  club: "",
  version: "",
  longSleeve: "false",
  year: "",
  playerName: "",
  playerNumber: "",
  signed: "false",
  manufacturer: "",
  imageUrl: "",
  owner: localStorage.getItem("owner") || "",
};

const errorMsg = {
  required: "Påkrevd",
  invalid: "Ugyldig format",
  kitNumber: "Må være mellom 1 og 99",
};

const validationSchema = Yup.object().shape({
  country: Yup.string().required(errorMsg.required),
  club: Yup.string().required(errorMsg.required),
  version: Yup.string().required(errorMsg.required),
  longSleeve: Yup.bool(),
  year: Yup.string().required(errorMsg.required),
  playerName: Yup.string(),
  playerNumber: Yup.number()
    .min(1, errorMsg.kitNumber)
    .max(99, errorMsg.kitNumber),
  signed: Yup.bool(),
  manufacturer: Yup.string(),
  imageUrl: Yup.string().url(errorMsg.invalid),
  owner: Yup.string().required(errorMsg.required),
});

function NewKitForm({ extractedValues, closeModal }) {
  const classes = useStyles();

  const submitKit = async values => {
    const newKit = {
      ...values,
      playerNumber: values.playerNumber ? parseInt(values.playerNumber) : "",
      longSleeve: values.longSleeve === "true",
      signed: values.signed === "true",
    };

    const response = await addKit(newKit);
    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={submitKit}
    >
      {({ setFieldValue }) => (
        <Form className={classes.form}>
          <Field name="owner" type="text">
            {({ field }) => (
              <div className={classes.field}>
                <Autocomplete
                  options={extractedValues.allOwners}
                  freeSolo
                  defaultValue={field.value}
                  onChange={(_, value) => {
                    setFieldValue(field.name, value);
                    // Set owner in localStorage
                    localStorage.setItem("owner", value);
                  }}
                  renderInput={params => (
                    <TextField
                      type="text"
                      label="Eier"
                      fullWidth
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
            {({ field }) => (
              <div className={classes.field}>
                <Autocomplete
                  options={extractedValues.allClubs}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  renderInput={params => (
                    <TextField
                      type="text"
                      label="Lag"
                      fullWidth
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

          <Field name="country">
            {({ field }) => (
              <div className={classes.field}>
                <Autocomplete
                  options={extractedValues.allCountries}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  renderInput={params => (
                    <TextField
                      type="text"
                      label="Land"
                      fullWidth
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

          <Field name="playerName">
            {({ field }) => (
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
            {({ field }) => (
              <div className={classes.field}>
                <TextField type="number" label="Spillernummer" {...field} />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>

          <Field name="version">
            {({ field }) => (
              <div className={classes.field}>
                <Autocomplete
                  options={extractedValues.allVersions}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  renderInput={params => (
                    <TextField
                      type="text"
                      label="Versjon (hjemme, borte)"
                      fullWidth
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
            {({ field }) => (
              <div className={classes.field}>
                <TextField type="text" label="År" {...field} />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>

          <Field name="manufacturer">
            {({ field }) => (
              <div className={classes.field}>
                <Autocomplete
                  options={extractedValues.allManufacturers}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  renderInput={params => (
                    <TextField
                      type="text"
                      label="Leverandør"
                      fullWidth
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

          <Field name="signed">
            {({ field }) => (
              <div className={classes.field}>
                <FormLabel component="legend">Signert</FormLabel>
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={"false"}
                    control={<Radio color="primary" />}
                    label="Nei"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value={"true"}
                    control={<Radio color="primary" />}
                    label="Ja"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </div>
            )}
          </Field>

          <Field name="longSleeve">
            {({ field }) => (
              <div className={classes.field}>
                <FormLabel component="legend">Ermer</FormLabel>
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={"false"}
                    control={<Radio color="primary" />}
                    label="Kort"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value={"true"}
                    control={<Radio color="primary" />}
                    label="Lang"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </div>
            )}
          </Field>

          <Field name="imageUrl" className={classes.field}>
            {({ field }) => (
              <div>
                <TextField type="text" label="Bilde-URL" fullWidth {...field} />
                <ErrorMessage
                  name={field.name}
                  className={classes.error}
                  component="div"
                />
              </div>
            )}
          </Field>
          <DialogActions>
            <Button onClick={closeModal}>Avbryt</Button>
            <Button type="submit" variant="contained" color="primary">
              Lagre
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}

export default NewKitForm;
