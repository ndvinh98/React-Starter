import axios from 'axios';

export const uploadFile = async (url: string, fileData: File): Promise<any> => {
  try {
    await axios.put(url, fileData, {
      headers: {
        'Content-Type': fileData.type,
      },
    });
    return true;
  } catch (err) {
    if (err) return;
  }
};
