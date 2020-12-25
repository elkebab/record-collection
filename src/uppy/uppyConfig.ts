import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import Norwegian from "@uppy/locales/lib/nb_NO";

export const createUppy = (owner: string, id: string) => () =>
  Uppy<Uppy.StrictTypes>({
    restrictions: {
      maxNumberOfFiles: 1,
      allowedFileTypes: ["image/*"],
    },
    locale: Norwegian,
  }).use(Transloadit, {
    params: {
      auth: { key: process.env.REACT_APP_TRANSLOADIT_KEY as string },
      template_id: process.env.REACT_APP_TRANSLOADIT_TEMPLATE as string,
    },
    waitForMetadata: true,
    waitForEncoding: true,
    fields: {
      owner,
      id,
    },
  });
