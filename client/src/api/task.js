import axios from "axios";

    export const createTask = async (collectionId, title, parentId,date) => {
      try {
        const { data } = await axios.post(`/collections/${collectionId}/tasks`, {
          title,
          parentId,
          date,
        });
        return data;
      } catch (error) {
        // toast.error(error?.response?.data?.message ?? "Error occurred Please try again.");
        return Promise.reject(error?.response?.data?.message ?? "Error");
      }
    }

    export const updateTaskApi = async (taskId,title, completed=false) => {
      try {
        const { data } = await axios.put(`/collections/tasks/${taskId}`, {
          title,
          completed,
        });
        return data;
      } catch (error) {
        return Promise.reject(error?.response?.data?.message ?? "Error");
      }
    }

   export const deleteTaskApi = async (collectionId,taskId) => {
      try {
        const { data } = await axios.delete(`/collections/${collectionId}/tasks/${taskId}`);
        return data;
      } catch (error) {
        return Promise.reject(error?.response?.data?.message ?? "Error");
      }
    }