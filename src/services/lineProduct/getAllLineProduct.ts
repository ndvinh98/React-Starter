import {request} from '@services';
import {ILineProduct} from '@types';

export const getAllLineProduct = (): Promise<ILineProduct[]> => {
  return request({
    method: 'GET',
    path: '/categories/all',
  }).then(([res, err]) => {
    if (err) {
      return null;
    }
    return res?.data?.data;
  });
};
