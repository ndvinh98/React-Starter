import axios from 'axios';

export const uploadFile = (url: string, fileData: File): Promise<boolean> => {
  return axios
    .put(url, fileData, {
      headers: {
        'Content-Type': fileData.type,
      },
    })
    .then(() => true)
    .catch(() => false);
};
