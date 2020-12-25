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
      auth: { key: "37baf3b6c9a841048c6c093dc4224b66" },
      template_id: "e3fcb9a5448a41b48efcdee61fb2ee70",
    },
    waitForMetadata: true,
    waitForEncoding: true,
    fields: {
      owner,
      id,
    },
  });
