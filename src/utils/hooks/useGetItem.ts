import {useState} from 'react';
import {request} from '@services';
import {IParams} from '@types';

export const useGetItem = <T = any>(url?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>(undefined);
  const [error, setError] = useState<any>();

  const getItem = async (params?: IParams, options?: {path?: string}) => {
    setLoading(true);
    request({
      method: 'GET',
      path: options?.path ? url + options?.path : url,
      option: {qs: params},
    })
      .then(([res, err]) => {
        if (err) {
          setError(err);
          return;
        }
        setData(res?.data?.data as T);
      })
      .finally(() => setLoading(false));
  };

  return {data, loading, error, getItem, setData};
};
