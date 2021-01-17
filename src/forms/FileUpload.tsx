import { Dashboard, useUppy } from "@uppy/react";
import { useFormikContext } from "formik";
import { createUppy } from "../uppy/uppyConfig";
import { Record } from "../types";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

interface FileUploadProps {
  hideUppy: () => void;
}

export const FileUpload = ({ hideUppy }: FileUploadProps) => {
  const { values, setFieldValue } = useFormikContext<Record>();
  const uppy = useUppy(createUppy(values.owner, values.id));

  uppy.on("transloadit:complete", (complete) => {
    setFieldValue(
      "imageUrl",
      complete.results.compress_image[0].url.replace("dl=0", "raw=1")
    );
    hideUppy();
  });

  return (
    <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} height={200} />
  );
};
