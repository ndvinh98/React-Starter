import axios from 'axios';

export const serverInterceptors = () => {
  return axios.interceptors.response.use(
    undefined,
    (err) =>
      new Promise(() => {
        if (err.response?.status === 401) {
          console.error('err.response.status', err.response?.status);
        }
        if (err.response?.data.message) {
          // toast({
          //   title: err.response?.data?.message,
          //   description: JSON.stringify(err.response?.data?.error),
          //   status: 'error',
          //   position: 'top-right',
          // });
        }
        throw err;
      }),
  );
};
