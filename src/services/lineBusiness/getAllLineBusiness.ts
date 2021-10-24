import {request} from '@services';
import {IApplication} from '@types';

export const getAllLineBusiness = (): Promise<IApplication[]> => {
  return request({
    method: 'GET',
    path: '/applications/all',
  }).then(([res, err]) => {
    if (err) {
      return null;
    }
    return res?.data?.data;
  });
};
