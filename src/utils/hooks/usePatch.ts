import {useState} from 'react';
import {request} from '@services';

export const usePatch = <T = any>(url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>(null);

  const patch = async (payload = {}, params?: any) => {
    setLoading(true);
    setData(null);
    request({
      method: 'PATCH',
      path: url,
      option: {qs: params, data: payload},
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

  return {data, loading, error, patch};
};
