import request from '@services/axios/request';

export const fetchLanguages = async () => {
  const [res, err] = await request({
    method: 'GET',
    path: '/languages/all',
  });
  if (err) return null;
  return res?.data?.data;
};
