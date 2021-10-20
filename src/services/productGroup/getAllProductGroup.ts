import {request} from '@services';
import {IProductGroup} from '@types';

export const getAllProductGroup = (): Promise<IProductGroup[]> => {
  return request({
    method: 'GET',
    path: '/groupings/all',
  }).then(([res, err]) => {
    if (err) {
      return null;
    }
    return res?.data?.data;
  });
};
