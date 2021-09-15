import create from 'zustand';

export interface IModalController {
  [key: string]: any;
  openModal: (name: string, data?: any) => void;
  closeModal: (name: string) => void;
  add_user: boolean;
  search: boolean;
  logout: boolean;
  comfirmRequest: boolean;
  data: any;
  action: boolean;
}

export const useModalController = create<IModalController>((set) => ({
  add_user: false,
  search: false,
  logout: false,
  comfirmRequest: false,
  action: false,
  data: null,
  openModal: (name: string, data?: any) => set({[name]: true, data}),
  closeModal: (name: string) => set({[name]: false, data: null}),
}));
