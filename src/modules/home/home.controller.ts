import create from 'zustand';
import {IMe} from '@types';
import {fetchMe} from '@services';

interface IHomeContoller {
  name: string;
  me: IMe;
  guard: () => Promise<boolean>;
}

export const useHomeController = create<IHomeContoller>((set, get) => ({
  name: '',
  me: null,
  guard: async () => {
    const {me} = get();
    if (me && !!+me?.isActive) {
      return true;
    }
    if (me && !+me?.isActive) {
      return false;
    }
    return fetchMe().then((me) => {
      if (me?.isActive) {
        set({me});
        return true;
      } else return false;
    });
  },
}));
