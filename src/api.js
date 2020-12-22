import { uuid } from "uuidv4";

// API docs: https://jsoneditoronline.herokuapp.com/

const docId = process.env.REACT_APP_DOC_ID;

// Fetch kit collections from all IDs
export const fetchKitCollection = async () => {
  const response = await fetch(
    `https://jsoneditoronline.herokuapp.com/v1/docs/${docId}`
  );
  const responseJson = await response.json();
  return {
    ...responseJson,
    data: JSON.parse(responseJson.data),
  };
};

export const createKit = async (newKit) => {
  const currentKitsResponse = await fetchKitCollection();

  const nextKitsData = [
    ...currentKitsResponse.data,
    {
      id: uuid(),
      ...newKit,
    },
  ];

  return updateKitsData(nextKitsData, currentKitsResponse._rev);
};

export const updateKit = async (updatedKit) => {
  const currentKitsResponse = await fetchKitCollection();

  const nextKitsData = currentKitsResponse.data.map((kit) => {
    if (kit.id === updatedKit.id) {
      return updatedKit;
    }
    return kit;
  });

  return updateKitsData(nextKitsData, currentKitsResponse._rev);
};

const updateKitsData = async (data, docRev) => {
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
