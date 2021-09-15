import {navigation} from '@router';

export const useRouter = () => {
  return {
    push: navigation.navigate,
    goBack: navigation.goBack,
    replace: (url: string) => navigation.navigate(url, {replace: true}),
  };
};
