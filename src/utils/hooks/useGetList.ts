import {useState} from 'react';
import {request} from '@services';
import {IParams} from '@types';

export const useGetList = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>();

  const getList = async (
    params?: IParams,
    options?: {path?: string; headers?: any; token?: string},
  ) => {
    setLoading(true);
    const [res, error] = await request({
      method: 'GET',
      path: options?.path || url,
      option: {
        qs: params,
      },
    });
    if (res) setData(res?.data?.data);
    else setData({});
    setError(error);
    setLoading(false);
  };

  return {data, loading, error, getList, setData};
};
