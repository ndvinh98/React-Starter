import request from '@services/axios/request';

export const fetchLanguages = () =>
  request({
    method: 'GET',
    path: '/languages/all',
  }).then(([res, err]) => {
    if (err) return null;
    return res?.data?.data;
  });
