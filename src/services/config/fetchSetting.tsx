import request from '@services/axios/request';

export const fetchSettings = () =>
  request({
    method: 'GET',
    path: '/appearanceSettings/all',
  }).then(([res, err]) => {
    if (err) return null;
    return res?.data?.data;
  });
