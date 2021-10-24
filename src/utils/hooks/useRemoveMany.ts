import {useState} from 'react';
import {request} from '@services';

export const useRemove = <T = any>(url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>(null);

  const removeMany = async (ids?: number[]) => {
    setLoading(true);
    setData(null);
    request({
      method: 'DELETE',
      path: url,
      option: {qs: {ids}},
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
  return {data, loading, error, removeMany};
};
