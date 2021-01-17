import { JsonEditorGet, Record } from "./types";

// API docs: https://jsoneditoronline.herokuapp.com/

const docId = process.env.REACT_APP_DOC_ID;

export const fetchRecordCollection = async () => {
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

export const createRecord = async (newRecord: Record) => {
  const currentRecordsResponse = await fetchRecordCollection();

  const nextRecordsData = [
    ...currentRecordsResponse.data,
    {
      ...newRecord,
      id: `${currentRecordsResponse.data.length}`,
    },
  ];

  return updateRecordsData(nextRecordsData, currentRecordsResponse._rev);
};

export const updateRecord = async (updatedRecord: Record) => {
  const currentRecordsResponse = await fetchRecordCollection();

  const updatedRecordsData = currentRecordsResponse.data.map((record: Record) =>
    record.id === updatedRecord.id ? updatedRecord : record
  );

  return updateRecordsData(updatedRecordsData, currentRecordsResponse._rev);
};

const updateRecordsData = async (data: Record[], docRev: string) => {
  const payload = {
    _id: docId,
    _rev: docRev,
    updated: new Date().toLocaleString(),
    name: "records",
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
