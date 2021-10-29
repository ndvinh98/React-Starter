import create from 'zustand';
import Pusher from 'pusher-js';
import {useSalesContoller} from '@modules/home';

export interface IEvent {
  event?: 'create';
  payload?: ICreatePayload;
}

export interface ICreatePayload {
  accessRequestId?: number;
  notificationId?: number;
  message?: string;
}

export interface IChannel {
  fileTransferEvent?: any;
  pushToFileTransfer?: (event: any) => void;
}

export const useChannelStore = create<IChannel>((set) => ({
  fileTransferEvent: null,
  pushToFileTransfer: (event) => set({fileTransferEvent: event}),
}));

useChannelStore.subscribe(() => {
  useSalesContoller.getState().getTotalUnread?.();
  useSalesContoller.getState().getNotifications?.({
    page: 1,
    limit: 10,
    filter: JSON.stringify([{isRead: '0'}]),
  });
});

export const pusher = new Pusher('6585afde39fde1addeec', {
  cluster: 'ap1',
});
