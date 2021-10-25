import {request} from '@services';

export const getAllMenus = (): Promise<any[]> => {
  return request({
    method: 'GET',
    path: '/applications/menu',
  }).then(([res, err]) => {
    if (err) {
      return null;
    }
    return res?.data?.data;
  });
};
