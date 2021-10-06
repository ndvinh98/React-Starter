import {useState} from 'react';
import {request} from '@services';
import {IParams} from '@types';

interface IListRes<T> {
  total?: number;
  limit?: number;
  page?: number;
  totalPages?: number;
  cache?: boolean;
  relations?: string[];
  order?: Record<string, number>;
  records?: T[];
}

export const useGetList = <T = any>(url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IListRes<T>>(null);
  const [error, setError] = useState<any>();

  const getList = async (
    params?: IParams,
    options?: {
      path?: string;
      headers?: any;
      token?: string;
      hiddenLoading?: boolean;
    },
  ) => {
    if (!options?.hiddenLoading) {
      setLoading(true);
      setData(null);
    }
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
        setData(res?.data?.data as IListRes<T>);
      })
      .finally(() => setLoading(false));
  };

  return {data, loading, error, getList, setData};
};
