import {request} from '@services';
import {IModules} from '@types';

export const getAllModules = (): Promise<IModules[]> => {
  return request({
    method: 'GET',
    path: '/productModules/all',
  }).then(([res, err]) => {
    if (err) {
      return null;
    }
    return res?.data?.data;
  });
};
