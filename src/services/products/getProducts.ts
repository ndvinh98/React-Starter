import {request} from '@services';

export const getProducts = (): Promise<any> => {
  return request({
    method: 'GET',
    path: '/products',
    option: {
      qs: {
        limit: 9999,
        relations: JSON.stringify([
          'grouping',
          'grouping.category',
          'grouping.category.application',
        ]),
      },
    },
  }).then(([res, err]) => {
    if (err) {
      return null;
    }
    return res?.data?.data;
  });
};
