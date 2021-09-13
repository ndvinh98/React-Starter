import {useState} from 'react';
import {request} from '@services';
import {IParams} from '@types';

export const useGetItem = <T = any>(url?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>();

  const getItem = async (params?: IParams, options?: {path?: string}) => {
    setLoading(true);

    const [res, error] = await request({
      method: 'GET',
      path: options?.path ? url + options?.path : url,
      option: {
        qs: params,
      },
    });
    if (res?.data?.data) setData(res?.data?.data as T);
    else setData(null);
    if (error) setError(error);
    setLoading(false);
  };

  return {item: data, loading, error, getItem};
};
