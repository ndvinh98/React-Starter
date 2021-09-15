import {Route} from 'navi';
import create from 'zustand';

export interface IGlobalController {
  currentRoute?: Route;
  setCurrentRoute: (route: Route) => void;
  params?: any;
  query?: any;
  path?: any;
  state?: any;
  pathname?: string;
}
export const useRouterController = create<IGlobalController>((set, get) => ({
  currentRoute: null,
  params: null,
  query: null,
  path: null,
  pathname: '',
  setCurrentRoute: (route: Route) => {
    const {pathname} = get();
    if (pathname !== route?.url?.pathname) {
      set({
        currentRoute: route,
        params: route?.lastChunk?.request?.params,
        query: route?.lastChunk?.request?.query,
        path: route?.lastChunk?.request?.originalUrl,
        state: route?.lastChunk?.request?.state,
        pathname: route?.url?.pathname,
      });
    }
  },
}));
