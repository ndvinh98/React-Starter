import {useCurrentRoute, useNavigation} from 'react-navi';

export const useRouter = () => {
  const {lastChunk} = useCurrentRoute();
  const {navigate, goBack, subscribe} = useNavigation();

  return {
    push: navigate,
    goBack,
    replace: (url: string) => navigate(url, {replace: true}),
    query: lastChunk?.request?.query,
    params: lastChunk?.request?.params,
    path: lastChunk?.request?.path,
    fullPath: lastChunk?.request?.originalUrl,
    search: lastChunk?.request?.search,
    state: lastChunk?.request?.state,
    context: lastChunk?.request?.context,
    subscribe: subscribe,
  };
};
