import { JsonEditorGet, Kit } from "./types";

// API docs: https://jsoneditoronline.herokuapp.com/

const docId = process.env.REACT_APP_DOC_ID;

// Fetch kit collections from all IDs
export const fetchKitCollection = async () => {
  const response = await fetch(
    `https://jsoneditoronline.herokuapp.com/v1/docs/${docId}`
  );
  const responseJson: any = await response.json();

  const parsedResponse: JsonEditorGet = {
    ...responseJson,
    data: JSON.parse(responseJson.data),
  };

  return parsedResponse;
};

export const createKit = async (newKit: Kit) => {
  const currentKitsResponse = await fetchKitCollection();

  const nextKitsData = [
    ...currentKitsResponse.data,
    {
      ...newKit,
      id: `${currentKitsResponse.data.length}`,
    },
  ];

  return updateKitsData(nextKitsData, currentKitsResponse._rev);
};

export const updateKit = async (updatedKit: Kit) => {
  const currentKitsResponse = await fetchKitCollection();

  const updatedKitsData = currentKitsResponse.data.map((kit: Kit) =>
    kit.id === updatedKit.id ? updatedKit : kit
  );

  return updateKitsData(updatedKitsData, currentKitsResponse._rev);
};

const updateKitsData = async (data: Kit[], docRev: string) => {
  const payload = {
    _id: docId,
    _rev: docRev,
    updated: new Date().toLocaleString(),
    name: "kits",
    data: JSON.stringify(data),
  };

  const response = await fetch(
    `https://jsoneditoronline.herokuapp.com/v1/docs/${docId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
  const responseJson = await response.json();
  return responseJson;
};
