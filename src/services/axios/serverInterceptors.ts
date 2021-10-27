import axios from 'axios';
import {createStandaloneToast} from '@chakra-ui/react';
import {navigation} from '@router';

export const serverInterceptors = () => {
  const toast = createStandaloneToast();
  return axios.interceptors.response.use(
    undefined,
    (err) =>
      new Promise(() => {
        if (err.response?.status === 401) {
          navigation.navigate('/auth');
        }
        if (err.response?.data.message) {
          toast({
            title: err.response?.data?.message,
            description: JSON.stringify(err.response?.data?.error),
            status: 'error',
            position: 'top-right',
            isClosable: true
          });
        }
        throw err;
      }),
  );
};
