import axios, {Method} from 'axios';
import EnvConfig from '@env';
import {useAuthStore} from '@global/auth';

export interface IParams {
  fields?: string;
  limit?: number;
  page?: number;
  sort?: string;
  filter?: any;
  cache?: boolean;
  textSearch?: string;
  relations?: string;
  [key: string]: any;
}

export interface IEXEC {
  method: Method;
  baseURL?: string;
  path?: string;
  option?: {
    qs?: IParams;
    data?: any;
    timeout?: number;
    token?: string;
    headers?: any;
  };
}

const request = async (props: IEXEC) => {
  const {method, baseURL = EnvConfig().BASE_URL, path, option} = props;
  const {getToken} = useAuthStore.getState();
  try {
    const res = await axios({
      method,
      baseURL,
      url: path,
      params: option?.qs,
      data: option?.data,
      timeout: option?.timeout,
      headers: {
        Authorization: `Bearer ${getToken() || option?.token}`,
        ...option?.headers,
      },
    });
    return [res, null];
  } catch (err) {
    return [null, err];
  }
};
export default request;
