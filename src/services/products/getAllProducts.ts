import {request} from '@services';
import {IProducts} from '@types';

export const getAllProducts = (): Promise<IProducts[]> => {
  return request({
    method: 'GET',
    path: '/products/all',
  }).then(([res, err]) => {
    if (err) {
      return null;
    }
    return res?.data?.data;
  });
};
