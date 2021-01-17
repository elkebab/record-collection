import * as Yup from "yup";
import { RecordType } from "../types";

const errorMsg = {
  required: "Obligatorisk",
  invalid: "Ugyldig format",
};

export const recordValidationSchema = Yup.object().shape({
  owner: Yup.string().required(errorMsg.required),
  album: Yup.string().required(errorMsg.required),
  band: Yup.string().required(errorMsg.required),
  year: Yup.string()
    .required(errorMsg.required)
    .test("format", errorMsg.invalid, (value: any) => {
      // Check that year is on format YYYY
      return value && value.length === 4 && !isNaN(parseInt(value));
    }),
  genre: Yup.string().required(errorMsg.required),
  type: Yup.string()
    .oneOf(Object.values(RecordType))
    .required(errorMsg.required),
  signed: Yup.bool(),
  imageUrl: Yup.string().url(errorMsg.invalid),
  description: Yup.string(),
});
