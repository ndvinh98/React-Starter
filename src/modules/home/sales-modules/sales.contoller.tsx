import create from 'zustand';
import {countUnread, getListNotifications} from '@services';

export interface ISalesContoller {
  totalUnread: number;
  notifications: any;
  getTotalUnread: () => any;
  loading: boolean;
  getNotifications: (args: {
    page?: number;
    limit?: number;
    textSearch?: string;
    filter?: string;
  }) => void;
}

export const useSalesContoller = create<ISalesContoller>((set) => ({
  totalUnread: 0,
  notifications: {},
  loading: false,
  getTotalUnread: async () => {
    countUnread().then((res) => {
      if (res?.count !== undefined) set({totalUnread: res?.count});
    });
  },
  getNotifications: ({page, limit, textSearch, filter}) => {
    set({loading: true});
    getListNotifications({page, limit, textSearch, filter})
      .then((res) => set({notifications: res}))
      .finally(() => set({loading: false}));
  },
}));
