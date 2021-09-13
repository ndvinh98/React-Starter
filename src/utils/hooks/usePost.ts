import {useState} from 'react';
import {request} from '@services';

export const usePost = <T = any>(url) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>('');

  const post = async (payload = {}, params?: any) => {
    setLoading(true);
    setData(null);

    const [res, err] = await request({
      method: 'POST',
      path: url,
      option: {qs: params, data: payload},
    });
    if (err) {
      setError(error);
    } else {
      const data = res?.data?.data as T;
      setData(data);
    }
    setLoading(false);
  };

  return {data, loading, error, post};
};
