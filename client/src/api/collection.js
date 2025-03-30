import axios from "axios";

export const getCollections = async () => {
  try {
    const res = await axios.get("/collections");
    return res?.data;
  } catch (error) {
    console.error(error);
  }
}

export const createNewCollection = async (collection) => {
  try {
    const res = await axios.post("/collections", collection);
    return res?.data;
  } catch (error) {
    console.error(error);
  }
}
export const getSingleCollection = async (id) => {
  try {
    const res = await axios.get(`/collections/${id}`);
    return res?.data;
  } catch (error) {
    console.error(error); 
  }
}

export const updateCollectionApi = async (id, collection) => {
  try {
    const res = await axios.put(`/collections/${id}`, collection);
    return res?.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteCollectionApi = async (id) => {
  try {
    const res = await axios.delete(`/collections/${id}`);
    return res?.data;
  } catch (error) {
    console.error(error);
  }
}