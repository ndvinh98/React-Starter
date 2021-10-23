import create from 'zustand';
import {IMe} from '@types';
import {fetchMe} from '@services';

interface IHomeContoller {
  name: string;
  me: IMe;
  guard: () => Promise<'unauthorized' | 'deactived' | 'sales' | 'admin'>;
}

export const useHomeController = create<IHomeContoller>((set, get) => ({
  name: '',
  me: null,
  guard: async () => {
    const {me} = get();
    if (me) {
      return guardAuth(me);
    } else
      return fetchMe().then((me) => {
        set({me});
        return guardAuth(me);
      });
  },
}));

const guardAuth = (me: IMe) => {
  if (!me) {
    localStorage.clear();
    return 'unauthorized';
  }
  if (me && !me?.isActive) return 'deactived';
  if (me && ['ADMIN', 'SUPERADMIN'].includes(me?.userType)) return 'admin';
  if (me && ['USER'].includes(me?.userType)) return 'sales';
  localStorage.clear();
  return 'unauthorized';
};
