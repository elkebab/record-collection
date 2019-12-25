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

export const addKit = async newKit => {
  const currentKitsResponse = await fetchKitCollection();
  const newKitPayload = {
    _id: currentKitsResponse._id,
    _rev: currentKitsResponse._rev,
    updated: new Date().toLocaleString(), // should send new date
    name: "kits",
    data: JSON.stringify([...currentKitsResponse.data, newKit]),
  };

  const response = await fetch(
    `https://jsoneditoronline.herokuapp.com/v1/docs/${docId}`,
    {
      method: "PUT",
      body: JSON.stringify(newKitPayload),
    }
  );
  const responseJson = await response.json();
  return responseJson;
};
